import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


  export async function PUT(request: NextRequest) {
    try {
      const { newName: subName, newGrade: grade, newCredit: credit } = await request.json();
  

      const _id = request.nextUrl.pathname.split('/').pop();
  
      if (!_id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
      }
  
      
      await dbConnect();
  
      
      const updatedSubject = await Subjects.findByIdAndUpdate(_id, { subName, grade, credit }, { new: true });
  
      
      if (!updatedSubject) {
        return NextResponse.json({ message: "Subject not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Subject updated", updatedSubject }, { status: 200 });
    } catch (error) {
      console.error("Error updating subject", error);
      return NextResponse.json({ message: "Error updating subject" }, { status: 500 });
    }
  
 }


 
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log("Received GET request for id:", id);

    if (!id) {
      console.log("No ID provided");
      return NextResponse.json({ message: 'Subject ID is required' }, { status: 400 });
    }

    await dbConnect();
    console.log("Connected to database");

    const subject = await Subjects.findById(id);
    console.log("Query result:", subject);

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