import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { RegisterData } from "../../src/types/types"; // ปรับ path ตามความเหมาะสม

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const register = async (req: Request, res: Response) => {
  const { email, password, phoneNumber }: RegisterData = req.body;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || null,
    },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.status(201).json({ token });
};
