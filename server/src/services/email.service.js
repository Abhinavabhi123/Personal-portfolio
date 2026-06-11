import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactMail = async ({
  name,
  email,
  subject,
  message,
}) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
      body {
        margin: 0;
        padding: 20px;
        background: #f4f7fb;
        font-family: Arial, Helvetica, sans-serif;
      }

      .container {
        max-width: 650px;
        margin: auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      }

      .header {
        background: linear-gradient(
          135deg,
          #0ea5e9,
          #2563eb
        );
        padding: 32px;
        color: white;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .header p {
        margin-top: 10px;
        opacity: 0.9;
      }

      .content {
        padding: 30px;
      }

      .field {
        margin-bottom: 24px;
      }

      .label {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #64748b;
        margin-bottom: 6px;
      }

      .value {
        color: #0f172a;
        font-size: 15px;
        line-height: 1.6;
      }

      .message-box {
        background: #f8fafc;
        border-left: 4px solid #0ea5e9;
        padding: 18px;
        border-radius: 8px;
        color: #334155;
        line-height: 1.8;
        white-space: pre-wrap;
      }

      .reply-section {
        text-align: center;
        padding: 10px 30px 35px;
      }

      .reply-btn {
        display: inline-block;
        background: #0ea5e9;
        color: white !important;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 14px;
      }

      .footer {
        border-top: 1px solid #e2e8f0;
        padding: 20px;
        text-align: center;
        color: #94a3b8;
        font-size: 13px;
      }

      .meta {
        background: #eff6ff;
        border: 1px solid #bfdbfe;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        color: #1e40af;
        font-size: 13px;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <div class="header">
        <h1>📩 New Portfolio Enquiry</h1>
        <p>You have received a new message from your portfolio website.</p>
      </div>

      <div class="content">

        <div class="meta">
          Received on ${new Date().toLocaleString()}
        </div>

        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>

        <div class="field">
          <div class="label">Email Address</div>
          <div class="value">${email}</div>
        </div>

        <div class="field">
          <div class="label">Subject</div>
          <div class="value">
            ${subject || "General Enquiry"}
          </div>
        </div>

        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">
            ${message}
          </div>
        </div>

      </div>

      <div class="reply-section">
        <a
          href="mailto:${email}"
          class="reply-btn"
        >
          Reply to ${name}
        </a>
      </div>

      <div class="footer">
        Sent from Abhinav K Portfolio Contact Form
      </div>

    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Abhinav K Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    replyTo: email,
    subject: `🚀 Portfolio Enquiry • ${
      subject || "New Message"
    }`,
    html,
  });
};