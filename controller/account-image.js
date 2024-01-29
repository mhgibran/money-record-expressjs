const prisma = require("../prisma/client");
const path = require("path");
const fs = require("fs");

const get = async function (req, res) {
  const data = await prisma.AccountImage.findMany({
    where: {
      deleted_at: null,
    },
  });

  return res.json({ data: data });
};

const store = async function (req, res) {
  try {
    const uploadedFile = req.file;

    const data = await prisma.AccountImage.create({
      data: {
        image_url: "accounts/" + uploadedFile.filename,
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully added account image!", data: data });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(uploadedFile.path);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async function (req, res) {
  const id = req.params.id;

  const data = await prisma.AccountImage.findUnique({
    where: { id: parseInt(id) },
  });

  if (!data) {
    return res.status(401).json({
      error: "Data not found!",
    });
  }

  try {
    const fileName = data.image_url;
    const filePath = path.join("public/", fileName);
    fs.unlinkSync(filePath);

    const uploadedFile = req.file;
    const updatedData = await prisma.AccountImage.update({
      where: { id: parseInt(id) },
      data: {
        image_url: "accounts/" + uploadedFile.filename,
      },
    });
    return res.json({
      message: "Successfully updated account image!",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const destroy = async function (req, res) {
  const id = req.params.id;

  const data = await prisma.AccountImage.findUnique({
    where: { id: parseInt(id) },
  });

  if (!data) {
    return res.status(401).json({
      error: "Data not found!",
    });
  }

  try {
    await prisma.AccountImage.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(),
      },
    });
    return res.json({
      message: "Successfully deleted account image!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { get, store, update, destroy };
