import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  console.log('📧 Creating email transporter with:');
  console.log('   Host:', process.env.SMTP_HOST);
  console.log('   Port:', process.env.SMTP_PORT);
  console.log('   User:', process.env.SMTP_USER);
  console.log('   Pass:', process.env.SMTP_PASS ? '***hidden***' : 'NOT SET');

  return nodemailer.createTransporter({
    service: 'gmail', // Use Gmail service
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: true, // Enable debug logs
    logger: true // Enable logger
  });
};

// Send contact form notification to admin
export const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Panchal Art Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'dkpanchal2023@gmail.com',
      subject: `New Contact Form Submission - ${contact.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Service:</strong> ${contact.service}</p>
            <p><strong>Submitted:</strong> ${contact.formattedDate}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6;">${contact.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
              <strong>IP Address:</strong> ${contact.ipAddress || 'N/A'}<br>
              <strong>User Agent:</strong> ${contact.userAgent || 'N/A'}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6c757d; font-size: 14px;">
              This email was sent from your Panchal Art website contact form.
            </p>
          </div>
        </div>
      `
    };

    console.log('📤 Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    return info;

  } catch (error) {
    console.error('❌ Contact notification email failed!');
    console.error('   Error Code:', error.code);
    console.error('   Error Message:', error.message);
    console.error('   Full Error:', error);
    
    // Provide specific guidance based on error type
    if (error.code === 'EAUTH') {
      console.error('🔧 AUTHENTICATION ERROR: Invalid email/password');
      console.error('   Solution: Use Gmail App Password instead of regular password');
    } else if (error.code === 'ECONNECTION') {
      console.error('🔧 CONNECTION ERROR: Cannot connect to SMTP server');
      console.error('   Solution: Check internet connection and firewall');
    }
    
    throw error;
  }
};

// Send auto-reply to customer
export const sendContactAutoReply = async (contact) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Panchal Art" <${process.env.SMTP_USER}>`,
      to: contact.email,
      subject: 'Thank you for contacting Panchal Art!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007bff; margin: 0;">Panchal Art</h1>
            <p style="color: #6c757d; margin: 5px 0;">Professional Art & Design Services</p>
          </div>
          
          <h2 style="color: #333;">Thank you for your inquiry!</h2>
          
          <p>Dear ${contact.name},</p>
          
          <p>Thank you for contacting Panchal Art regarding <strong>${contact.service}</strong>. We have received your message and appreciate your interest in our services.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">What happens next?</h3>
            <ul style="line-height: 1.8;">
              <li>Our team will review your requirements carefully</li>
              <li>We'll get back to you within 24 hours</li>
              <li>If needed, we'll schedule a consultation call</li>
              <li>We'll provide you with a detailed quote</li>
            </ul>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Contact Information</h3>
            <p style="margin: 5px 0;"><strong>📍 Address:</strong> In front of Railway Station, Thasara, 388250</p>
            <p style="margin: 5px 0;"><strong>📞 Phone:</strong> +91 9426362542</p>
            <p style="margin: 5px 0;"><strong>📧 Email:</strong> dkpanchal2023@gmail.com</p>
            <p style="margin: 5px 0;"><strong>🕒 Hours:</strong> Mon-Sat: 9AM-7PM, Sun: 10AM-4PM</p>
          </div>
          
          <p>If you have any urgent questions, please don't hesitate to call us directly.</p>
          
          <p>Best regards,<br>
          <strong>Panchal Art Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <div style="text-align: center; color: #6c757d; font-size: 14px;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent:', info.messageId);
    return info;

  } catch (error) {
    console.error('❌ Auto-reply email failed:', error.message);
    throw error;
  }
};

// Send quote notification to admin
export const sendQuoteNotification = async (quote) => {
  try {
    const transporter = createTransporter();

    const attachments = [];
    if (quote.image && quote.image.cloudinaryUrl) {
      attachments.push({
        filename: quote.image.originalName,
        path: quote.image.cloudinaryUrl
      });
    }

    const mailOptions = {
      from: `"Panchal Art Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'dkpanchal2023@gmail.com',
      subject: `New Quote Request - ${quote.service} - ${quote.quoteNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            New Quote Request - ${quote.quoteNumber}
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${quote.name}</p>
            <p><strong>Email:</strong> ${quote.email}</p>
            <p><strong>Phone:</strong> ${quote.phone}</p>
            <p><strong>Service:</strong> ${quote.service}</p>
            <p><strong>Submitted:</strong> ${quote.formattedDate}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #28a745; margin-top: 0;">Project Description</h3>
            <p style="line-height: 1.6;">${quote.description.replace(/\n/g, '<br>')}</p>
          </div>
          
          ${quote.image ? `
            <div style="margin: 20px 0; padding: 15px; background-color: #d4edda; border-radius: 5px;">
              <p style="margin: 0; color: #155724;">
                <strong>📎 Attachment:</strong> ${quote.image.originalName} (${(quote.image.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
              <strong>Quote ID:</strong> ${quote._id}<br>
              <strong>IP Address:</strong> ${quote.ipAddress || 'N/A'}<br>
              <strong>Status:</strong> ${quote.status}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6c757d; font-size: 14px;">
              This email was sent from your Panchal Art website quote form.
            </p>
          </div>
        </div>
      `,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Quote notification email sent:', info.messageId);
    return info;

  } catch (error) {
    console.error('❌ Quote notification email failed:', error.message);
    throw error;
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};
