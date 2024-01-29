const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");

const get = async function (req, res) {
  const data = await prisma.Account.findMany({
    where: { deleted_at: null },
    include: {
      image: {
        select: {
          image_url: true,
        },
      },
    },
  });

  return res.json({ data: data });
};

const store = async function (req, res) {
  const { image_id, name, balance } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const data = await prisma.Account.create({
      data: {
        image_id: parseInt(image_id),
        name: name,
        balance: parseInt(balance),
      },
    });

    return res.status(201).json({ message: "Successfully added new account!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const show = async function (req, res) {
  const data = await prisma.Account.findUnique({
    where: { id: parseInt(req.params.id), deleted_at: null },
    include: {
      image: {
        select: {
          image_url: true,
        },
      },
    },
  });

  return res.json({ data: data });
};

const update = async function (req, res) {
  const id = req.params.id;
  const { image_id, name, balance } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    await prisma.Account.update({
      where: { id: parseInt(id), deleted_at: null },
      data: {
        image_id: parseInt(image_id),
        name: name,
        balance: parseInt(balance),
      },
    });

    const data = await prisma.Account.findUnique({
      where: { id: parseInt(id) },
      include: {
        image: {
          select: {
            image_url: true,
          },
        },
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
    await prisma.Account.update({
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
