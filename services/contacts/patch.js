const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const { asyncWrapper } = require(`${basedir}/help`);

const updateStatus = asyncWrapper(async ({ id, body }) => {
  const data = await Contact.findByIdAndUpdate(id, body, { new: true });

  if (!data) {
    return null;
  }

  return data;
});

module.exports = updateStatus;
