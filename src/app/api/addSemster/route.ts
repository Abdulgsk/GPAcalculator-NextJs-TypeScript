import { dbConnect } from "@/app/_lib/mongoose";
import Semster from "@/app/models/semster";
import { NextResponse } from "next/server";

export async function POST(request : Request){

    try{
    const{ title ,userId} = await request.json();
     await dbConnect();

     await Semster.create({ title ,userId});

     return NextResponse.json(
        { message: "Title Successfully Created" },
        { status: 201 }
     );
    }
    catch(error){
        console.error("Error adding semster:", error);
      return NextResponse.json(
         { message: "Error adding semster" },
         { status: 500 } 
      );
    }

}