const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/help`);

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  return res.json({
    status: "Success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
