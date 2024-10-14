import { dbConnect } from "@/app/_lib/mongoose";
import Result from "@/app/models/result";
import { NextResponse } from "next/server";

export async function POST(request : Request){

    try{
    const{ result , userId} = await request.json();
     await dbConnect();

     await Result.create({result ,userId});

     return NextResponse.json(
        { message: "Result Successfully Created" },
        { status: 201 }
     );
    }
    catch(error){
        console.error("Error adding result:", error);
      return NextResponse.json(
         { message: "Error adding result" },
         { status: 500 } 
      );
    }

}