//

import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
     const semId = request.nextUrl.pathname.split('/').pop();
    

    if (!semId) {
      return NextResponse.json(
        { message: "semId parameter is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const subjects = await Subjects.find({ semId });

    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects", error);
    return NextResponse.json(
      { message: "Error fetching subjects" },
      { status: 500 }
    );
  }
}
