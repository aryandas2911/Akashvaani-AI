from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.profile_extraction_service import process_profile_extraction

router = APIRouter(prefix="/ai", tags=["Extraction"])


@router.post("/extract-profile")
async def extract_profile(file: UploadFile = File(...)):
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
            content_type=content_type
        )
        
        return extracted_profile
        
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")
