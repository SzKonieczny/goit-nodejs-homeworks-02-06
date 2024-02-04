const nodemailer = require("nodemailer");

// const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

// Konfiguracja transportera dla Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false, // Ustaw true, jeśli używa sie SSL
  auth: {
    user: "postmaster@sandboxb439229341e34405a14f0a8d1b53eea1.mailgun.org",
    pass: "9cf98819607968146b5b9a52c0ef4f6d-69a6bd85-5321c6bb",
  },
});

const sendEmail = async (email, verifyToken) => {
  console.log(email, verifyToken);

  // Utwórz opcje wiadomości e-mail
  const mailOptions = {
    from: "postmaster@sandboxb439229341e34405a14f0a8d1b53eea1.mailgun.org",
    to: email,
    subject: "Verify email",
    text: "Please, confirm your email",
  };

  // Wysylanie e-mail za pomocą transportera Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
