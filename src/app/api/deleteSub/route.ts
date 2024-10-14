import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";

export async function POST(request : Request){

    try{
    const{subId} = await request.json();
     await dbConnect();

     const result = await Subjects.deleteOne({ _id: subId });

    
     if (result.deletedCount === 0) {
       return NextResponse.json(
         { message: "Subject not found" },
         { status: 404 }
       );
     }
 
     return NextResponse.json(
       { message: "Subject deleted successfully" },
       { status: 200 }
     );

     return NextResponse.json(
        { message: "Subject Deleted Created" },
        { status: 201 }
     );
    }
    catch(error){
        console.error("Error deleting subject:", error);
      return NextResponse.json(
         { message: "Error deleting subject" },
         { status: 500 } 
      );
    }

}