//

import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
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

    const subjects = await Subjects.find({ userId });

    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects", error);
    return NextResponse.json(
      { message: "Error fetching subjects" },
      { status: 500 }
    );
  }
}
