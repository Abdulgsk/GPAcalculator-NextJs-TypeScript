import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";

export async function POST(request : Request){

    try{
    const{ subject , grade , credits ,semId} = await request.json();
     await dbConnect();

     await Subjects.create({subName : subject,grade ,credit : credits, semId});

     return NextResponse.json(
        { message: "Subject Successfully Created" },
        { status: 201 }
     );
    }
    catch(error){
        console.error("Error adding subject:", error);
      return NextResponse.json(
         { message: "Error adding subject" },
         { status: 500 } 
      );
    }

}