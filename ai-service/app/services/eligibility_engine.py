import logging
from app.db.supabase_client import fetch_schemes

logger = logging.getLogger(__name__)

DOC_BOOLEAN_FIELDS = [
    'aadhaar_card', 'pan_card', 'passport', 'voter_id', 'driving_license',
    'ration_card', 'birth_certificate', 'death_certificate',
    'marriage_certificate', 'caste_status_certificate', 'income_certificate'
]

async def analyze_eligibility(citizen_profile: dict) -> list:
    """
    Fetches schemes from Supabase and scores each against the citizen profile.
    Hard filters on: income, gender, student status, age.
    Bonus score for: number of verified documents.
    """
    try:
        schemes = await fetch_schemes()
    except Exception as e:
        logger.error(f"Failed to fetch schemes: {e}")
        return []

    # Count verified documents from profile flags
    doc_count = sum(1 for field in DOC_BOOLEAN_FIELDS if citizen_profile.get(field) is True)
    doc_bonus = min(doc_count / len(DOC_BOOLEAN_FIELDS), 1.0) * 0.15  # up to +0.15 bonus

    eligible_schemes = []

    for scheme in schemes:
        rules = scheme.get("eligibility_rules", {})
        if not isinstance(rules, dict):
            # No rules = universally eligible
            eligible_schemes.append({
                "scheme": scheme.get("name", scheme.get("title", "Unknown Scheme")),
                "score": round(0.70 + doc_bonus, 2),
                "benefit": scheme.get("benefit", "Varies")
            })
            continue

        score = 0.0
        total_rules = 0
        is_eligible = True

        # Rule 1: Income ceiling (hard filter)
        if "income_max" in rules:
            total_rules += 1
            user_income = citizen_profile.get("income", float('inf'))
            if user_income <= rules["income_max"]:
                score += 1.0
            else:
                is_eligible = False

        # Rule 2: Gender (hard filter if specified)
        if "gender" in rules and rules["gender"] and rules["gender"].lower() != "all":
            total_rules += 1
            user_gender = (citizen_profile.get("gender") or "").lower()
            required_gender = rules["gender"].lower()
            if user_gender == required_gender:
                score += 1.0
            else:
                is_eligible = False

        # Rule 3: Student status (hard filter)
        if "student" in rules:
            total_rules += 1
            occ = (citizen_profile.get("occupation") or "").lower()
            user_is_student = occ == "student" or citizen_profile.get("student") is True
            if user_is_student == rules["student"]:
                score += 1.0
            else:
                is_eligible = False

        # Rule 4: Minimum age
        if "age_min" in rules:
            total_rules += 1
            user_age = citizen_profile.get("age", 0) or 0
            if user_age >= rules["age_min"]:
                score += 1.0
            else:
                is_eligible = False

        if not is_eligible:
            continue

        # Base eligibility score + document completeness bonus
        base_score = (score / total_rules) if total_rules > 0 else 0.70
        final_score = base_score + doc_bonus

        # Cap and add small rule-density boost for perfect matches
        if base_score == 1.0:
            final_score += len(rules) * 0.01
        final_score = round(min(final_score, 0.99), 2)

        eligible_schemes.append({
            "scheme": scheme.get("name", scheme.get("title", "Unknown Scheme")),
            "score": final_score,
            "benefit": scheme.get("benefit", "Varies")
        })

    eligible_schemes.sort(key=lambda x: x["score"], reverse=True)
    return eligible_schemes
