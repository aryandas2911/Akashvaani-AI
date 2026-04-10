import asyncio
from ..utils.ocr import extract_text_from_document

async def run_ocr_extraction(file_bytes: bytes, file_name: str) -> dict:
    """
    Wrapper for the new OCR utility. 
    Returns a basic dict to maintain compatibility with existing main.py logic.
    """
    text = extract_text_from_document(file_bytes, file_name)
    
    # Return a structure similar to what the mock returned previously
    return {
        "raw_text": text,
        "name": "Extracted from OCR",
        "status": "Success"
    }
