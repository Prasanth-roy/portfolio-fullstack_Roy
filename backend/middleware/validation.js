const validator = require('validator');

const validateContactForm = (req, res, next) => {
  const { name, email, message } = req.body;

  // Check if all fields are present
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  // Validate name length
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Name must be between 2 and 50 characters'
    });
  }

  // Validate message length
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({
      success: false,
      message: 'Message must be between 10 and 1000 characters'
    });
  }

  next();
};

module.exports = {
  validateContactForm
};