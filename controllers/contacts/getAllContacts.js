// @ GET /api/contacts

const { basedir } = global;

const service = require(`${basedir}/services/contacts`);

const getAllContacts = async (req, res) => {
  const { _id: id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await service.getAll({ id, skip, limit, favorite });

  return res.json({
    status: "Success",
    code: 200,
    message: "Contacts found",
    data: {
      result,
    },
  });
};

module.exports = getAllContacts;
