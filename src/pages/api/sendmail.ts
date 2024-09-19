// src/pages/api/sendmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import multiparty from 'multiparty';
import fs from 'fs';

// CORS 설정을 위한 예시 코드



export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    console.log('백애드Post')
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the files', err);
      return res.status(500).json({ message: 'Error parsing the files' });
    }

    const name = fields.name[0];
    const email = fields.email[0];
    const subject = fields.subject[0];
    const message = fields.message[0];
    const cc = fields.cc ? fields.cc[0] : ''; // CC 필드 추가
    const bcc = fields.bcc ? fields.bcc[0] : ''; // BCC 필드 추가



    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const attachments = files.attachment ? [
      {
        filename: files.attachment[0].originalFilename,
        path: files.attachment[0].path,
      },
    ] : [];

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: Number(587),
        secure: process.env.SMTP_SECURE === 'false',
        auth: {
          user: 'taulcontact',
          pass: 'mbjv fyre bkhk kurw',
        },
      });

      const mailOptions = {
        from: 'taulcontact',
        to: 'taulcontact@gmail.com',
        replyTo: email, // 고객의 이메일 주소를 Reply-To 필드에 설정
        cc: cc, // CC 필드 추가
        bcc: bcc, // BCC 필드 추가
        subject: '[AUBESTUDIO WEB 발신] '+subject,
        text: message,
        html: `<p>${message}</p>`,
        attachments,
      };

      await transporter.sendMail(mailOptions);

      // Clean up temporary files
      if (attachments.length > 0) {
        fs.unlinkSync(attachments[0].path);
      }

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}
