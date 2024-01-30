const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const gravatar = require("gravatar");

const { asyncWrapper } = require(`${basedir}/help`);

const signup = asyncWrapper(async ({ username, email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    return null;
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ username, email, avatarURL });
  newUser.setPassword(password);
  await newUser.save();
});

module.exports = signup;
