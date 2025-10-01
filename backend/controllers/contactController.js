const transporter = require('../config/emailConfig');

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Email content for you (the portfolio owner)
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #6366f1; margin-bottom: 15px;">Contact Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 100px;">Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                  <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">
                    ${email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Date:</td>
                <td style="padding: 8px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #6366f1; margin-bottom: 15px;">Message</h3>
            <p style="line-height: 1.6; color: #333; margin: 0;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `
    };

    // Auto-reply to the user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
              Thank you for getting in touch! I've received your message and will get back to you as soon as possible.
            </p>
            
            <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
              I typically respond within 24 hours. If your inquiry is urgent, you can also reach me directly at my phone number.
            </p>
          </div>

          <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #6366f1; margin-bottom: 10px;">What to Expect Next:</h4>
            <ul style="color: #333; line-height: 1.6;">
              <li>Initial response within 24 hours</li>
              <li>Discussion about your project requirements</li>
              <li>Proposal and timeline if applicable</li>
            </ul>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Best regards,<br>
              <strong>Prasanth Mortha</strong><br>
              Full Stack Developer<br>
              Email: morthaprasanth698@gmail.com<br>
              Phone: +91 9177688154
            </p>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
};

module.exports = {
  sendContactEmail
};