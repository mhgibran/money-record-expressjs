const { body } = require("express-validator");
const prisma = require("../prisma/client");

const accountValidateSchema = [
  body("id")
    .optional()
    .custom(async (value) => {
      const isExists = await prisma.account.findUnique({
        where: { id: parseInt(value) },
      });

      if (!isExists) {
        return Promise.reject("Account not found!");
      }

      return true;
    }),
  body("image_id")
    .exists()
    .withMessage("Account image must be selected!")
    .custom(async (value) => {
      const isExists = await prisma.AccountImage.findUnique({
        where: { id: parseInt(value) },
      });

      if (!isExists) {
        return Promise.reject("Invalid account image!");
      }

      return true;
    }),
  body("name")
    .exists()
    .withMessage("Account Name is required")
    .isString()
    .withMessage("Account Name should be string")
    .isLength({ min: 2 })
    .withMessage("Account Name should be at least 2 characters")
    .isLength({ max: 60 })
    .withMessage("Account Name must be a maximum of 60 characters"),
  body("balance")
    .exists()
    .withMessage("Saldo is required")
    .isInt()
    .withMessage("Saldo should be integer"),
];

module.exports = { accountValidateSchema };
