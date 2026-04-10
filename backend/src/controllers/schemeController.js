const supabase = require('../config/supabaseClient');

const getSchemes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('schemes')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching schemes:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSchemes,
};
