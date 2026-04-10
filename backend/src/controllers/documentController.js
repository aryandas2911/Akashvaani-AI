const { supabase } = require('../config/supabaseClient');
const aiService = require('../services/aiService');

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Check user_id in body
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    // Prepare filename
    const fileExt = req.file.originalname.split('.').pop() || 'pdf';
    const fileName = `${user_id}_${Date.now()}.${fileExt}`;

    // Upload file to Supabase Storage bucket "documents"
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('documents')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Generate public URL
    const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName);
    const fileUrl = urlData.publicUrl;

    // Send file URL to AI service
    const profile = await aiService.parseDocument(fileUrl, user_id);

    // Return extracted citizen profile
    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument
};
