from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uuid
import re
from .db.supabase_client import (
    fetch_schemes,
    create_application,
    store_document_extraction,
    upload_document_to_storage,
    create_user
)
from .services.ocr_service import run_ocr_extraction
from .services.eligibility_engine import analyze_eligibility
from .routes.extraction_routes import router as extraction_router

app = FastAPI(title="Akashvaani AI Service")

# Enable CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(extraction_router)

@app.get("/")
async def health_check():
    return {"status": "AI Service is running"}

@app.get("/schemes")
async def get_schemes():
    try:
        data = await fetch_schemes()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/applications")
async def draft_application(app_data: dict):
    try:
        data = await create_application(app_data)
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/documents")
async def save_document(doc_data: dict):
    try:
        data = await store_document_extraction(doc_data)
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/documents/upload")
async def upload_document(
    user_id: str = Form(...),
    document_type: str = Form("id_proof"),
    file: UploadFile = File(...)
):
    try:
        file_bytes = await file.read()
        
        # 1. Generate unique file name and upload to Supabase Storage
        ext = file.filename.split('.')[-1] if '.' in file.filename else 'pdf'
        unique_filename = f"{user_id}_{uuid.uuid4().hex[:8]}.{ext}"
        
        file_url = await upload_document_to_storage(
            unique_filename, 
            file_bytes, 
            file.content_type
        )
        
        # 2 & 3. Run mock OCR extraction
        extracted_data = await run_ocr_extraction(file_bytes, file.filename)
        
        # 4. Save extracted data into Supabase 'documents' table
        doc_record = {
            "user_id": user_id,
            "document_type": document_type,
            "file_url": file_url,
            "extracted_data": extracted_data
        }
        
        saved_data = await store_document_extraction(doc_record)
        
        # Return extracted citizen profile
        return extracted_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/demo-citizen")
async def demo_citizen():
    citizen_data = {
        "name": "Ravi Kumar",
        "age": 19,
        "occupation": "Student",
        "student": True,
        "income": 200000,
        "state": "Uttar Pradesh",
        "education": "BTech"
    }
    
    try:
        # 1. Insert demo user
        user_record = await create_user(citizen_data)
        citizen_profile = user_record[0] if user_record else citizen_data
        
        # 2. Run eligibility engine
        eligible_schemes = await analyze_eligibility(citizen_profile)
        
        # 3. Calculate total benefit amount
        total_benefit = 0
        for scheme in eligible_schemes:
            benefit_str = str(scheme.get("benefit", ""))
            # Extract numbers from benefit strings like "₹50,000 per year"
            digits = re.sub(r'[^\d]', '', benefit_str)
            if digits:
                total_benefit += int(digits)
                
        return {
            "citizen_profile": citizen_profile,
            "eligible_schemes": eligible_schemes,
            "total_benefit_amount": f"₹{total_benefit:,}" if total_benefit > 0 else "N/A"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/agents/reasoning/{user_id}")
async def get_agent_reasoning(user_id: str):
    """
    Returns step-by-step reasoning for the eligibility AI agent.
    """
    return [
        "Parsing citizen profile",
        "Fetching schemes from database",
        "Analyzing eligibility rules",
        "Calculating benefit totals",
        "Generating application drafts"
    ]

