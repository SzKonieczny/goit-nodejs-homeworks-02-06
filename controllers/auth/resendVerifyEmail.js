// @POST /users/verify/

const { basedir } = global;

const service = require(`${basedir}/services/auth`);

const { User } = require(`${basedir}/models/user`);

const { schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/help`);

const resendVerifyEmail = async (res, req) => {
  const { error } = schemas.verifyResendEmail.validate(req.body);

  if (error) {
    throw createError(400, "missing required field email");
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404);
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  await service.sendEmail(email, user.verificationToken);

  return res.json({
    status: "Success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
