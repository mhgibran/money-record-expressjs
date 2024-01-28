const prisma = require("../prisma/client");
const fs = require("fs");

const get = async function (req, res) {
  const data = await prisma.icon.findMany({
    where: {
      deleted_at: null,
    },
  });

  return res.json(data);
};

const store = async function (req, res) {
  try {
    const uploadedFile = req.file;

    const data = await prisma.icon.create({
      data: {
        icon: uploadedFile.path,
      },
    });

    return res.json({ message: "Successfully added icon!", data: data });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(uploadedFile.path);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async function (req, res) {
  const id = req.params.id;

  const data = await prisma.icon.findUnique({
    where: { id: parseInt(id) },
  });

  if (!data) {
    return res.status(401).json({
      error: "Data not found!",
    });
  }

  try {
    fs.unlinkSync(data.icon);
    const uploadedFile = req.file;

    const updatedData = await prisma.icon.update({
      where: { id: parseInt(id) },
      data: {
        icon: uploadedFile.path,
      },
    });
    return res.json({
      message: "Successfully updated icon!",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const destroy = async function (req, res) {
  const id = req.params.id;

  const data = await prisma.icon.findUnique({
    where: { id: parseInt(id) },
  });

  if (!data) {
    return res.status(401).json({
      error: "Data not found!",
    });
  }

  try {
    await prisma.icon.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(),
      },
    });
    return res.json({
      message: "Successfully deleted icon!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { get, store, update, destroy };
