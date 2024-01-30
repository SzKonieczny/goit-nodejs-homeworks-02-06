const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { asyncWrapper } = require(`${basedir}/help`);

const patch = asyncWrapper(async ({ id, subscription }) => {
  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  return result;
});

module.exports = patch;
