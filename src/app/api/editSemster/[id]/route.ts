import { dbConnect } from "@/app/_lib/mongoose";
import Semster from "@/app/models/semster";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


  export async function PUT(request: NextRequest) {
    try {
      const { newName: title } = await request.json();
  

      const _id = request.nextUrl.pathname.split('/').pop();
  
      if (!_id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
      }
  
      
      await dbConnect();
  
      
      const updatedSemster = await Semster.findByIdAndUpdate(_id, { title }, { new: true });
  
      
      if (!updatedSemster) {
        return NextResponse.json({ message: "Title not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Title updated", updatedSemster }, { status: 200 });
    } catch (error) {
      console.error("Error updating title", error);
      return NextResponse.json({ message: "Error updating title" }, { status: 500 });
    }
  
 }

