const supabase = require('../config/supabaseClient');

const createApplication = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating application:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
};
