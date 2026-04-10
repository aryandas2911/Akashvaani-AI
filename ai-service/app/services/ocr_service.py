import asyncio

async def run_ocr_extraction(file_bytes: bytes, file_name: str) -> dict:
    """
    Mock OCR extraction function.
    In a real scenario, this would integrate with Tesseract, Google Cloud Vision, etc.
    """
    # Simulate external API processing time
    await asyncio.sleep(1)
    
    # Mock extracted fields
    return {
        "name": "Arjun Kumar",
        "age": 34,
        "state": "Maharashtra",
        "occupation": "Farmer"
    }
