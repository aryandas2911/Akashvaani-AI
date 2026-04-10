const aiService = require('../services/aiService');

const getReasoningTimeline = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const timeline = await aiService.getReasoningTimeline(userId);
    res.status(200).json(timeline);
  } catch (error) {
    next(error); // Push errors into errorHandler layer cleanly
  }
};

module.exports = {
  getReasoningTimeline
};
