import { dbConnect } from "@/app/_lib/mongoose";
import Semster from "@/app/models/semster";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
     const userId = request.nextUrl.pathname.split('/').pop();
    

    if (!userId) {
      return NextResponse.json(
        { message: "userId parameter is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const semsters= await Semster.find({ userId });

    return NextResponse.json(semsters, { status: 200 });
  } catch (error) {
    console.error("Error fetching semsters", error);
    return NextResponse.json(
      { message: "Error fetching semsters" },
      { status: 500 }
    );
  }
}
