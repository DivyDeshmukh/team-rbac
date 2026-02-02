import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
// we have to load this explicitly for test scripts even if we have .env instead of .env.local
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" })

declare global {
    var prisma: PrismaClient | undefined
}

// in Prisma 7, the Rust engine has been removed by default when using the prisma-client generator type, so Prisma doesn’t bundle a query engine — it must use a driver adapter to actually talk to the database.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = 
    global.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV !== "production" ? ["query", "warn", "error"] : [],
        adapter
    });

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}