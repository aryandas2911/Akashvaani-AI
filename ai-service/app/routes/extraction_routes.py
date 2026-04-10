from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.profile_extraction_service import process_profile_extraction

router = APIRouter(prefix="/ai", tags=["Extraction"])


@router.post("/extract-profile")
async def extract_profile(user_id: str = None, doc_type: str = None, file: UploadFile = File(...)):
    """
    Endpoint to upload a document and extract structured citizen profile data.
    """
    try:
        content_type = file.content_type
        filename = file.filename
        file_bytes = await file.read()
        
        # Process extraction
        extracted_profile = await process_profile_extraction(
            file_bytes=file_bytes,
            filename=filename,
            content_type=content_type,
            user_id=user_id,
            doc_type=doc_type
        )
        
        return extracted_profile
        
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")


@router.get("/get-document-url")
async def get_document_url(user_id: str, doc_type: str):
    """
    Fetches the permanent storage URL for a specific document type.
    """
    try:
        from app.db.supabase_client import fetch_document_url_by_type
        url = await fetch_document_url_by_type(user_id, doc_type)
        if not url:
            raise HTTPException(status_code=404, detail="Document not found")
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze-eligibility")
async def analyze_eligibility_route(profile: dict):
    """
    Analyzes a user profile against all available schemes to determine eligibility.
    """
    try:
        from app.services.eligibility_engine import analyze_eligibility
        results = await analyze_eligibility(profile)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
