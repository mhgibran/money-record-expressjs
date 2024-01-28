const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");

const get = async function (req, res) {
  const data = await prisma.account.findMany({ where: { deleted_at: null } });

  return res.json({ data: data });
};

const store = async function (req, res) {
  const { icon_id, name, balance } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const data = await prisma.account.create({
      data: {
        icon_id: parseInt(icon_id),
        name: name,
        balance: parseInt(balance),
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully added new account!", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const show = async function (req, res) {
  const data = await prisma.account.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  return res.json({ data: data });
};

const update = async function (req, res) {
  const id = req.params.id;
  const { icon_id, name, balance } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const data = await prisma.account.update({
      where: { id: parseInt(id) },
      data: {
        icon_id: parseInt(icon_id),
        name: name,
        balance: parseInt(balance),
      },
    });

    return res.json({ message: "Successfully updated account!", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const destroy = async function (req, res) {
  const id = req.params.id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const data = await prisma.account.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(),
      },
    });

    return res.json({ message: "Successfully deleted account!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { get, store, show, update, destroy };
