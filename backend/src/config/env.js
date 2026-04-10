require('dotenv').config();

const port = process.env.PORT || 5000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Validate required variables
const requiredFields = { supabaseUrl, supabaseKey };
for (const [key, value] of Object.entries(requiredFields)) {
  if (!value) {
    console.warn(`Warning: Missing required environment variable -> ${key}`);
  }
}

const config = {
  port,
  supabaseUrl,
  supabaseKey,
  aiServiceUrl
};

module.exports = { config };
