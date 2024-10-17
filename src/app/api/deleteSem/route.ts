import { dbConnect } from "@/app/_lib/mongoose";
import Semster from "@/app/models/semster";
import { NextResponse } from "next/server";
import Subjects from "@/app/models/subject";
import Result from "@/app/models/result";

export async function POST(request : Request){

    try{
    const{semId} = await request.json();
     await dbConnect();

     const result = await Semster.deleteOne({ _id: semId });
     await Subjects.deleteMany({ semId });
     await Result.deleteOne({ semId });

    
     if (result.deletedCount === 0) {
       return NextResponse.json(
         { message: "Semster not found" },
         { status: 404 }
       );
     }
 
     return NextResponse.json(
       { message: "Semster deleted successfully" },
       { status: 200 }
     );

     return NextResponse.json(
        { message: "Semster Deleted Created" },
        { status: 201 }
     );
    }
    catch(error){
        console.error("Error deleting semster:", error);
      return NextResponse.json(
         { message: "Error deleting semster" },
         { status: 500 } 
      );
    }

}