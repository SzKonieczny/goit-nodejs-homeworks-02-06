const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const gravatar = require("gravatar");

const { asyncWrapper } = require(`${basedir}/help`);

const { v4 } = require("uuid");

const signup = asyncWrapper(async ({ username, email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    return null;
  }

  const verificationToken = v4();

  const avatarURL = gravatar.url(email);

  const newUser = new User({ username, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
});

module.exports = signup;
