 // pages/api/sendConfirmation.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ComplaintRequestBody {
  userEmail: string;
  userName: string;
  complaintId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userEmail, userName, complaintId } = req.body as ComplaintRequestBody;

  if (!userEmail || !userName || !complaintId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 2525,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  try {
    await transporter.sendMail({
      from: '"Support Team" <support@example.com>',
      to: userEmail,
      subject: 'Complaint Confirmation',
      html: `
        <h3>Hello ${userName},</h3>
        <p>We have received your complaint. (Complaint ID: <strong>${complaintId}</strong>)</p>
        <p>Our team will contact you shortly.</p>
        <br/>
        <p>Thank you,<br/>Support Team</p>
      `,
    });

    return res.status(200).json({ message: 'Confirmation email sent' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
