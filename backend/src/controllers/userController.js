const { supabase } = require('../config/supabaseClient');

const createUser = async (req, res) => {
  try {
    const { name, age, occupation, income, state, education } = req.body;
    
    // Validate required fields
    if (!name || age === undefined || !occupation || income === undefined || !state || !education) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user by email:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  getUserByEmail
};
