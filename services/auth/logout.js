const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { asyncWrapper } = require(`${basedir}/help`);

const logout = asyncWrapper(async ({ id }) => {
  const user = await User.findOne({ id });

  if (!user) {
    return null;
  }

  await User.findByIdAndUpdate(id, { token: null });

  return user;
});

module.exports = logout;
