const { supabase } = require('../config/supabaseClient');

const getSchemes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('schemes').select('*');
    if (error) throw error;
    res.status(200).json({ schemes: data });
  } catch (error) {
    console.error('Error fetching schemes:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('schemes').select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Scheme not found' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching scheme:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSchemes,
  getSchemeById,
};
