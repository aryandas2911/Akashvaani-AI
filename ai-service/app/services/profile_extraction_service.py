import uuid
from ..utils.ocr import extract_text_from_document
from ..agents.profile_extraction_agent import extract_citizen_profile
from ..db.supabase_client import upload_document_to_storage, store_document_extraction

async def process_profile_extraction(file_bytes: bytes, filename: str, content_type: str, user_id: str = "demo_user"):
    """
    Orchestrates the profile extraction process:
    1. Uploads document to Supabase Storage.
    2. Extracts raw text via OCR.
    3. Parses text into structured profile using AI agent.
    4. Saves extraction history to database.
    """
    
    # 1. Upload to Supabase Storage
    # Generate unique filename
    ext = filename.split('.')[-1] if '.' in filename else 'bin'
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    
    file_url = await upload_document_to_storage(
        unique_filename,
        file_bytes,
        content_type
    )
    
    # 2. Extract Raw Text (OCR)
    raw_text = extract_text_from_document(file_bytes, filename)
    
    if not raw_text:
        # Fallback error or attempt secondary extraction
        pass

    # 3. AI Extraction (LangChain Agent)
    profile_data = extract_citizen_profile(raw_text)
    
    # 4. Store in Database
    doc_record = {
        "user_id": user_id,
        "file_url": file_url,
        "document_type": "auto_fill_extraction",
        "extracted_data": profile_data.dict()
    }
    
    await store_document_extraction(doc_record)
    
    return profile_data.dict()
