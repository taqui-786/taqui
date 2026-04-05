"use server";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  purpose: string;
}

const resendApiKey = process.env.RESEND_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const mailTo = 'hi@taqui.in';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Clean Professional HTML Email Template
function createContactEmailTemplate({
  name,
  email,
  message,
  purpose,
}: ContactFormData): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const safePurpose = escapeHtml(purpose);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background-color: #f5f5f5;
                padding: 20px;
            }
            
            .email-container {
                max-width: 560px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                border: 1px solid #e5e5e5;
                overflow: hidden;
            }
            
            .header {
                background-color: #1a1a1a;
                color: #ffffff;
                padding: 24px;
                text-align: left;
            }
            
            .header h1 {
                font-size: 18px;
                font-weight: 600;
                letter-spacing: -0.02em;
            }
            
            .content {
                padding: 24px;
            }
            
            .info-row {
                display: flex;
                border-bottom: 1px solid #f0f0f0;
                padding: 14px 0;
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .info-label {
                font-weight: 500;
                color: #666666;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.03em;
                min-width: 80px;
            }
            
            .info-value {
                color: #1a1a1a;
                font-size: 15px;
                word-break: break-word;
            }
            
            .info-value a {
                color: #1a1a1a;
                text-decoration: underline;
            }
            
            .message-section {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e5e5e5;
            }
            
            .message-label {
                font-weight: 500;
                color: #666666;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.03em;
                margin-bottom: 10px;
            }
            
            .message-content {
                background-color: #fafafa;
                border: 1px solid #f0f0f0;
                border-radius: 6px;
                padding: 16px;
                font-size: 15px;
                color: #1a1a1a;
                white-space: pre-wrap;
                line-height: 1.7;
            }
            
            .footer {
                background-color: #fafafa;
                border-top: 1px solid #e5e5e5;
                padding: 16px 24px;
                text-align: left;
            }
            
            .footer p {
                color: #888888;
                font-size: 12px;
            }
            
            @media (max-width: 600px) {
                body {
                    padding: 10px;
                }
                
                .content {
                    padding: 20px 16px;
                }
                
                .header {
                    padding: 20px 16px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>New Contact Form Submission</h1>
            </div>
            
            <div class="content">
                <div class="info-row">
                    <span class="info-label">From</span>
                    <span class="info-value">${safeName}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Email</span>
                    <span class="info-value">
                        <a href="mailto:${safeEmail}">${safeEmail}</a>
                    </span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Purpose</span>
                    <span class="info-value">${safePurpose}</span>
                </div>
                
                <div class="message-section">
                    <div class="message-label">Message</div>
                    <div class="message-content">${safeMessage}</div>
                </div>
            </div>
            
            <div class="footer">
                <p>Received on ${new Date().toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// sendMail function
export async function sendMail({
  name,
  email,
  message,
  purpose,
}: ContactFormData) {
  if (!resendApiKey || !resend) {
    console.error("Email sending failed: missing RESEND_KEY");
    return false;
  }

  // Generate HTML email body
  const htmlBody = createContactEmailTemplate({
    name,
    email,
    message,
    purpose,
  });

  // Create subject line
  const emailSubject = `New message from ${name} - ${purpose}`;

  try {
    const { data, error } = await resend.emails.send({
      from: email,
      to: [mailTo],
      replyTo: email,
      subject: emailSubject,
      html: htmlBody,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Purpose: ${purpose}

Message:
${message}

Received on: ${new Date().toLocaleString()}
      `.trim(),
    });

    if (error) {
      console.error("Email sending failed:", error);
      return false;
    }

    return Boolean(data?.id);
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
