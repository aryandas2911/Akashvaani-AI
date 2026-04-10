import os
from dotenv import load_dotenv
from supabase import create_async_client, AsyncClient

load_dotenv()

url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# We initialize this client on demand or could manage it centrally.
# Using a function to ensure it's awaited properly if used within FastAPI.
async def get_supabase() -> AsyncClient:
    if not url or not key:
        raise ValueError("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
    return await create_async_client(url, key)

async def fetch_schemes():
    """Fetches all schemes from the database."""
    client = await get_supabase()
    response = await client.table("schemes").select("*").execute()
    return response.data

async def store_document_extraction(document_data: dict):
    """Stores extracted document data."""
    client = await get_supabase()
    response = await client.table("documents").insert(document_data).execute()
    return response.data

async def create_user(user_data: dict):
    """Creates a citizen user."""
    client = await get_supabase()
    response = await client.table("users").insert(user_data).execute()
    return response.data

async def fetch_user_by_id(user_id: str):
    """Fetches a user by their UUID."""
    client = await get_supabase()
    response = await client.table("users").select("*").eq("id", user_id).execute()
    return response.data[0] if response.data else None


async def create_application(application_data: dict):
    """Creates a new draft application."""
    client = await get_supabase()
    response = await client.table("applications").insert(application_data).execute()
    return response.data

async def upload_document_to_storage(file_name: str, file_bytes: bytes, content_type: str) -> str:
    """Uploads a file to Supabase Storage 'documents' bucket and returns the public URL."""
    client = await get_supabase()
    
    # Upload to storage
    await client.storage.from_("documents").upload(
        path=file_name,
        file=file_bytes,
        file_options={"content-type": content_type}
    )
    
    # For supabase-py async client get_public_url returns a string synchronously
    public_url = client.storage.from_("documents").get_public_url(file_name)
    return public_url

