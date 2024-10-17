import { dbConnect } from "@/app/_lib/mongoose";
import Result from "@/app/models/result";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
     
      const semId = request.nextUrl.pathname.split('/').pop();
  
      if (semId) {
        console.log("No ID provided");
        return NextResponse.json({ message: 'Sem ID is required' }, { status: 400 });
      }
  
      await dbConnect();
  
      const result = await Result.findById(semId);
  
      if (!result) {
        console.log("Result not found");
        return NextResponse.json({ message: 'Result not found' }, { status: 404 });
      }
  
      return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
      console.error('Error finding subject:', error);
      return NextResponse.json({ message: 'Error finding Result', error: (error as Error).message }, { status: 500 });
    }
  }