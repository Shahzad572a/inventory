const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Controller to get expenses by category
const getExpensesByCategory = async (req, res) => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });

    // Convert BigInt 'amount' field to string
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json(expenseByCategorySummary);
  } catch (error) {
    console.error("Error retrieving expenses by category:", error);
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};

// Export the controller
module.exports = { getExpensesByCategory };
