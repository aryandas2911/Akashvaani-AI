const { supabase } = require('../config/supabaseClient');

const createApplication = async (req, res) => {
  try {
    const { user_id, scheme_id, status = 'draft' } = req.body;
    
    if (!user_id || !scheme_id) {
      return res.status(400).json({ error: 'user_id and scheme_id are required' });
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([{ user_id, scheme_id, status }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating application:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getApplicationsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user_id);

    if (error) throw error;

    res.status(200).json({ applications: data });
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['draft', 'submitted', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Application not found' });

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating application:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getApplicationsByUser,
  updateApplicationStatus,
};
