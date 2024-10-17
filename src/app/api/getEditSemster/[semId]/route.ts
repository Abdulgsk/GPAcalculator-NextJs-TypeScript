import { dbConnect } from "@/app/_lib/mongoose";
import Semster from "@/app/models/semster";
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
  
      const semster = await Semster.findById(_id);
  
      if (!semster) {
        console.log("Subject not found");
        return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
      }
  
      return NextResponse.json({ semster }, { status: 200 });
    } catch (error) {
      console.error('Error finding subject:', error);
      return NextResponse.json({ message: 'Error finding subject', error: (error as Error).message }, { status: 500 });
    }
  }