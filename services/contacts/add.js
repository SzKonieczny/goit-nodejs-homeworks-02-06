const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const { asyncWrapper } = require(`${basedir}/help`);

const add = asyncWrapper(async ({ id, body }) => {
  const data = await Contact.create({ ...body, owner: id });

  return data;
});

module.exports = add;
