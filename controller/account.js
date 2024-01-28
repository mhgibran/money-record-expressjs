const prisma = require("../prisma/client");

const get = async function (req, res) {
  const data = await prisma.account.findMany();

  return res.json(data);
};

const store = async function (req, res) {
  const data = await prisma.account.create();

  return res.json(data);
};

module.exports = { get };
