import { dbConnect } from "@/app/_lib/mongoose";
import User from "@/app/models/user"; 
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
   
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

  
    if (!userId) {
      return NextResponse.json(
        { message: "userId query parameter is required" },
        { status: 400 }
      );
    }

    
    await dbConnect();

    
    const user = await User.findOne({ _id: userId });

 
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

  
    return NextResponse.json(
      { name: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}
