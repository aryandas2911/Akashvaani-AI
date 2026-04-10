const axios = require('axios');
const { config } = require('../config/env');

const aiClient = axios.create({
  baseURL: config.aiServiceUrl,
});

/**
 * Communicates with AI service to perform eligibility analysis
 */
const analyzeEligibility = async (userId) => {
  try {
    const response = await aiClient.post('/ai/eligibility', {
      user_id: userId
    });
    return response.data; // Returns eligible schemes & benefit totals
  } catch (error) {
    console.error('Error tracing AI Eligibility:', error.message);
    throw error;
  }
};

/**
 * Extracts citizen profile from uploaded document
 */
const parseDocument = async (fileUrl, userId) => {
  try {
    const response = await aiClient.post('/ai/documents/parse', {
      file_url: fileUrl,
      user_id: userId
    });
    return response.data; // Returns extracted citizen profile
  } catch (error) {
    console.error('Error parsing Document:', error.message);
    throw error;
  }
};

/**
 * Gets reasoning timeline for agent explanation
 */
const getReasoningTimeline = async (userId) => {
  try {
    const response = await aiClient.get(`/ai/agents/reasoning/${userId}`);
    return response.data; // Returns timeline payload array
  } catch (error) {
    console.error('Error fetching reasoning timeline:', error.message);
    throw error;
  }
};

module.exports = {
  analyzeEligibility,
  parseDocument,
  getReasoningTimeline
};
