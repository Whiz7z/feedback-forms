import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

let db = new PrismaClient();

async function seed() {
  await Promise.all([
    db.user.create({
      data: {
        username: "Yevhen",
        passwordHash: await bcrypt.hash("qwerty", 10),
      },
    }),
  ]);
}

seed();
