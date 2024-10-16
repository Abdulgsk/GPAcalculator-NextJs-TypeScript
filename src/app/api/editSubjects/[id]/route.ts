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

