const { createClient } = require('@supabase/supabase-js');
const { config } = require('./env');

let supabase;

try {
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment configuration.");
  }
  
  // Initialize Supabase Client
  supabase = createClient(config.supabaseUrl, config.supabaseKey);
  console.log("Supabase client initialized successfully.");
  
} catch (error) {
  console.error("Failed to initialize Supabase client gracefully:", error.message);
  supabase = null; // Return null intentionally so dependent routes can handle the absence instead of crashing
}

// Exporting it as an object so it can be destructured using `const { supabase } = require(...)`
module.exports = { supabase };
