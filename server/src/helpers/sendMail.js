import dotEnv from 'dotenv';
import nodemailer from 'nodemailer';
import UpdateWorker from '../workers/UpdateWorker';
import logger from './logger';

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
  transporter.sendMail(mailOption, (error, info) => {
    if (error) return logger.error(error);
    return logger.info(info);
  });
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
  transporter.sendMail(mailOption, (error, info) => {
    if (error) logger.error(error);
    setTimeout(() => {
      UpdateWorker.updateUserDetails(mailOption);
    }, 1000);
    logger.info(info);
  });
};

export default { sendEmail, sendVerificationEmail };
