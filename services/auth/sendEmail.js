const sgEmail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verifyToken) => {
  console.log(email, verifyToken);

  const mail = {
    from: "s_kon@op.pl",
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Please, confirm your email</a>`,
  };

  await sgEmail
    .send(mail)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.response));
};

module.exports = sendEmail;
