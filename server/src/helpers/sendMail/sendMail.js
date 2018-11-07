import sgMail from '@sendgrid/mail';

const sendEmail = (receiver, sender, subject, htmlTemplate) => {
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = {
    to: receiver,
    from: sender,
    subject,
    html: htmlTemplate,
  };
  sgMail.send(message);
};

export default sendEmail;
