const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const { asyncWrapper } = require(`${basedir}/help`);

const getById = asyncWrapper(async ({ id }) => {
  const data = await Contact.findById(id).populate(
    "owner",
    "email subscription"
  );

  if (!data) {
    return null;
  }

  return data;
});

module.exports = getById;
