import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { RegisterData } from "../../../../types/types"; // ปรับ path ตามความเหมาะสม

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export async function POST(req: Request) {
  try {
    const { email, password, phoneNumber }: RegisterData = await req.json();
    console.log("Received data:", { email, password, phoneNumber });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phoneNumber: phoneNumber || null,
      },
    });
    console.log("Created user:", user);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {
      expiresIn: "1h",
    });
    console.log("Generated token:", token);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
