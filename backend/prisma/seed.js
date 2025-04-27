const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model = prisma[modelName];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, 'seedData');

  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const modelName = path.basename(fileName, path.extname(fileName));
    const formattedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const model = prisma[formattedModelName];

    if (model) {
      const filePath = path.join(dataDirectory, fileName);
      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      if (Array.isArray(fileData)) {
        for (const item of fileData) {
          await model.create({ data: item });
        }
        console.log(`Seeded data into ${formattedModelName}`);
      } else {
        console.error(`Data in ${fileName} is not an array`);
      }
    } else {
      console.error(`Model ${formattedModelName} not found.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


 