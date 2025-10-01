const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');
const { validateContactForm } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

// Rate limiting - 5 requests per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact attempts from this IP, please try again after 15 minutes.'
  }
});

const router = express.Router();

router.post('/contact', contactLimiter, validateContactForm, sendContactEmail);

module.exports = router;