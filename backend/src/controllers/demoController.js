const { supabase } = require('../config/supabaseClient');
const aiService = require('../services/aiService');

const runDemoCitizen = async (req, res, next) => {
  try {
    // 1. Insert demo user into Supabase
    const demoData = {
      name: 'Ravi Kumar',
      age: 19,
      occupation: 'Student',
      income: 200000,
      state: 'Uttar Pradesh',
      education: 'BTech',
    };

    const { data: insertedUsers, error } = await supabase
      .from('users')
      .insert([demoData])
      .select();

    if (error) throw new Error(`Supabase insert error: ${error.message}`);
    if (!insertedUsers || insertedUsers.length === 0) throw new Error('Failed to insert demo user');
    
    const user = insertedUsers[0];

    // 2. Call AI service to analyze eligibility
    const aiResponse = await aiService.analyzeEligibility(user.id);

    // 3. Return response containing citizen_profile, eligible_schemes, and total_benefits
    // Extract properties properly. Adjust according to what aiResponse actually structurally resolves.
    res.status(200).json({
      citizen_profile: user,
      eligible_schemes: aiResponse.eligible_schemes || aiResponse.data || aiResponse,
      total_benefits: aiResponse.total_benefits || aiResponse.total_benefit_amount || 0
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  runDemoCitizen
};
