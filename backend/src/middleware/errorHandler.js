const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message || err);
  
  // Optional: could parse specific validation errors here
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
