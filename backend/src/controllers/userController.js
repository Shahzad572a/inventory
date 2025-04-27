const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Controller to get users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

// Export the controller
module.exports = { getUsers };
