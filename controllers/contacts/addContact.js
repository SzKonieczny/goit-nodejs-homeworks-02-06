// @ POST /api/contacts

const { basedir } = global;

const service = require(`${basedir}/services/contacts`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/help`);

const addContact = async (req, res) => {
  const { error } = schemas.add.validate(req.body);

  if (error) {
    throw createError(400, "Missing required name field");
  }
  const { _id: id } = req.user;
  const result = await service.add(...req.body, id);
  return res.json({
    status: "Success",
    code: 201,
    message: "Request successful. Contact created",
    data: {
      result,
    },
  });
};

module.exports = addContact;
