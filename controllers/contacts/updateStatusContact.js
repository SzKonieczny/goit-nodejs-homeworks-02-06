// @ PATCH /api/contacts/:id/favorite
const { basedir } = global;

const service = require(`${basedir}/services/contacts`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/help`);

const updateStatusContact = async (req, res) => {
  const { error } = schemas.favoriteSchema.validate(req.body);

  if (error) {
    throw createError(404, "Missing field favorite");
  }

  const { id } = req.params;
  const result = await service.updateStatus(id, {
    favorite: req.body.favorite,
  });

  if (!result) {
    throw createError(404);
  }

  return res.json({
    status: "Success",
    code: 200,
    message: "Contacts updated",
    data: {
      result,
    },
  });
};
module.exports = updateStatusContact;
