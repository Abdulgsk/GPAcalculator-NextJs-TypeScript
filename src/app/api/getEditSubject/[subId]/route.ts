import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
     
      const _id = request.nextUrl.pathname.split('/').pop();
  
      if (!_id) {
        console.log("No ID provided");
        return NextResponse.json({ message: 'Subject ID is required' }, { status: 400 });
      }
  
      await dbConnect();
  
      const subject = await Subjects.findById(_id);
  
      if (!subject) {
        console.log("Subject not found");
        return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
      }
  
      console.log("Returning subject:", subject);
      return NextResponse.json({ subject }, { status: 200 });
    } catch (error) {
      console.error('Error finding subject:', error);
      return NextResponse.json({ message: 'Error finding subject', error: (error as Error).message }, { status: 500 });
    }
  }