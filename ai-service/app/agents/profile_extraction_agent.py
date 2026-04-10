from typing import Optional
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
import os

class CitizenProfile(BaseModel):
    name: str = Field(description="Full name of the citizen")
    age: Optional[int] = Field(description="Age of the citizen in years")
    gender: Optional[str] = Field(description="Gender of the citizen")
    state: Optional[str] = Field(description="State of residence (e.g., Uttar Pradesh, Maharashtra)")
    district: Optional[str] = Field(description="District of residence")
    occupation: Optional[str] = Field(description="Occupation of the citizen (e.g., Student, Farmer)")
    annual_income: Optional[float] = Field(description="Estimated annual income if mentioned")
    education: Optional[str] = Field(description="Highest education level (e.g., BTech, Graduate)")
    confidence_score: float = Field(description="Confidence score between 0.0 and 1.0 based on data extraction")

def extract_citizen_profile(raw_text: str) -> CitizenProfile:
    """
    Uses LangChain and OpenAI to extract structured citizen profile data from raw OCR text.
    """
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0,
        api_key=os.getenv("OPENAI_API_KEY")
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an AI system that extracts citizen information from Indian government documents such as Aadhaar, PAN cards, and student IDs. "
                   "If a field is not explicitly found, leave it as null. "
                   "Infer the occupation as 'Student' if the document is a student ID or college fee receipt."),
        ("user", "Extract citizen information from the following raw document text:\n\n{text}")
    ])

    # Using the newer structured output interface
    structured_llm = llm.with_structured_output(CitizenProfile)
    
    chain = prompt | structured_llm
    
    result = chain.invoke({"text": raw_text})
    return result
