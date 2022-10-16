import { PrismaClient } from "@prisma/client";
import { data } from "./seed-data.cjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.dish.createMany({
    data,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
