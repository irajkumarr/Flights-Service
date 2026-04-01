// import { PrismaPg } from "@prisma/adapter-pg";
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient({
//   log: ["query"],
//   adapters: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
// });

// module.exports = prisma;


import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;