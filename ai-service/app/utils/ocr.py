import pytesseract
from PIL import Image
import io
import pdfplumber
import os

def extract_text_from_document(file_bytes: bytes, filename: str) -> str:
    """
    Extracts raw text from a document (image or PDF).
    """
    ext = filename.split('.')[-1].lower() if '.' in filename else ''
    
    if ext == 'pdf':
        return _extract_text_from_pdf(file_bytes)
    else:
        return _extract_text_from_image(file_bytes)

def _extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts text from PDF using pdfplumber.
    """
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    
    # If no text extracted (likely a scanned PDF), we might need to OCR each page.
    # For simplicity in this hackathon version, we assume if direct extraction fails, 
    # the user should upload images or we would need pdf2image which is another dependency.
    return text.strip()

def _extract_text_from_image(file_bytes: bytes) -> str:
    """
    Extracts text from an image using Tesseract.
    """
    image = Image.open(io.BytesIO(file_bytes))
    text = pytesseract.image_to_string(image)
    return text.strip()
