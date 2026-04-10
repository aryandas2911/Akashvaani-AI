import uuid
from app.utils.ocr import extract_text_from_document
from app.agents.profile_extraction_agent import extract_citizen_profile
from app.db.supabase_client import upload_document_to_storage, store_document_extraction, update_user, fetch_user_by_id

DOC_TYPE_TO_COLUMN = {
    'Aadhaar Card': 'aadhaar_card',
    'PAN Card': 'pan_card',
    'Passport': 'passport',
    'Voter ID': 'voter_id',
    'Driving License': 'driving_license',
    'Ration Card': 'ration_card',
    'Birth Certificate': 'birth_certificate',
    'Death Certificate': 'death_certificate',
    'Marriage Certificate': 'marriage_certificate',
    'Caste Status Certificate': 'caste_status_certificate',
    'Income Certificate': 'income_certificate'
}

async def process_profile_extraction(file_bytes: bytes, filename: str, content_type: str, user_id: str = None, doc_type: str = None):
    """
    Orchestrates the profile extraction process:
    1. Uploads document to Supabase Storage.
    2. Extracts raw text via OCR.
    3. Parses text into structured profile using Tesseract + Regex.
    4. Updates/Saves citizen profile in database.
    5. Saves extraction history to database.
    """
    
    # 1. Upload to Supabase Storage
    file_url = None
    try:
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        file_url = await upload_document_to_storage(
            unique_filename,
            file_bytes,
            content_type
        )
    except Exception as e:
        print(f"Warning: Storage upload failed: {str(e)}")

    # 2. Extract Raw Text (OCR)
    raw_text = extract_text_from_document(file_bytes, filename)
    
    # 3. Heuristic Extraction
    profile_data = extract_citizen_profile(raw_text, file_bytes)
    profile_dict = profile_data.dict()

    # 4. Update User Profile in Database
    # We map CitizenProfile fields to standard database fields if necessary
    user_update_payload = {
        "name": profile_dict.get("name") if profile_dict.get("name") != "Unknown" else None,
        "age": profile_dict.get("age"),
        "gender": profile_dict.get("gender"),
        "state": profile_dict.get("state"),
        "district": profile_dict.get("district"),
        "occupation": profile_dict.get("occupation"),
        "income": profile_dict.get("annual_income"),
        "education": profile_dict.get("education"),
        "email": profile_dict.get("email")
    }

    # Add document verification flag if doc_type is provided and matched
    if doc_type and doc_type in DOC_TYPE_TO_COLUMN:
        flag_name = DOC_TYPE_TO_COLUMN[doc_type]
        user_update_payload[flag_name] = True
        profile_dict[flag_name] = True # Ensure it's returned to frontend

    # Remove None values to avoid overwriting existing valid data with nulls
    user_update_payload = {k: v for k, v in user_update_payload.items() if v is not None}

    if user_id and user_id != "demo_user":
        try:
            await update_user(user_id, user_update_payload)
            print(f"Successfully updated profile for user {user_id}")
        except Exception as e:
            print(f"Warning: Failed to update user profile: {str(e)}")

    # 5. Store Extraction History (Logging)
    try:
        doc_record = {
            "user_id": user_id if user_id != "demo_user" else None,
            "file_url": file_url,
            "document_type": doc_type or "auto_fill_extraction",
            "extracted_data": profile_dict
        }
        await store_document_extraction(doc_record)
    except Exception as e:
        print(f"Warning: Failed to log extraction to database: {str(e)}")

    profile_dict["file_url"] = file_url
    return profile_dict
