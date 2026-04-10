import axios from 'axios';

const aiApi = axios.create({
  baseURL: 'http://localhost:8000',
});


const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || error.message || 'AI Processing failed');
  }
};

export const extractProfile = (file, userId = null, docType = null) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Pass user_id and doc_type as query parameters
  let url = '/ai/extract-profile';
  const params = [];
  if (userId) params.push(`user_id=${userId}`);
  if (docType) params.push(`doc_type=${encodeURIComponent(docType)}`);
  
  if (params.length > 0) {
    url += '?' + params.join('&');
  }
  
  return handleRequest(() => aiApi.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }));
};

export default aiApi;


export const fetchDocumentUrl = (userId, docType) => {
  return handleRequest(() => aiApi.get(`/ai/get-document-url?user_id=${userId}&doc_type=${encodeURIComponent(docType)}`));
};

export const analyzeEligibility = (profile) => {
  return handleRequest(() => aiApi.post('/ai/analyze-eligibility', profile));
};
