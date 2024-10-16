import { dbConnect } from "@/app/_lib/mongoose";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();

    
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    await dbConnect();

    const user = await User.findOne({ name: trimmedName });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (trimmedPassword !== user.password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", userId: user._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}