import dotEnv from 'dotenv';
import nodemailer from 'nodemailer';
import UpdateWorker from '../workers/UpdateWorker';

dotEnv.config();

const sendEmail = (mailOption) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  transporter.sendMail(mailOption);
};

const sendVerificationEmail = (mailOption) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  transporter.sendMail(mailOption, () => {
    setTimeout(() => {
      UpdateWorker.updateUserDetails(mailOption);
    }, 1000);
  });
};

export default { sendEmail, sendVerificationEmail };
