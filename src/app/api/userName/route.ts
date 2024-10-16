import { dbConnect } from "@/app/_lib/mongoose";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();

    // Trim spaces from name and password
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    await dbConnect();

    const existingUser = await User.findOne({ name: trimmedName });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({ name: trimmedName, password: trimmedPassword });

    return NextResponse.json(
      { message: "User Successfully Created", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}