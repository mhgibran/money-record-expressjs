const prisma = require("../client");
const bcrypt = require("bcrypt");

function hashPassword(string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(string, salt);
  return hash;
}

async function seed() {
  try {
    // Define your seed data
    const users = [
      {
        name: "Haekal Gibran",
        password: hashPassword("qwerty2024"),
        email: "mhgibran@gmail.com",
        gender: "MALE",
      },
      {
        name: "Elsa Putri",
        password: hashPassword("qwerty2024"),
        email: "elsa.putri95@gmail.com",
        gender: "FEMALE",
      },
      // Add more data as needed
    ];

    // Insert seed data using Prisma Client
    await prisma.user.createMany({ data: users });

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close Prisma Client connection
    await prisma.$disconnect();
  }
}

seed();
