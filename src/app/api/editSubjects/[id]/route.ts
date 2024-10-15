import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface EditPageParams {
    id: string;
  }
  
  interface EditProps {
    params: EditPageParams;
  }

export async function PUT(request : Request, {params} : EditProps) {
    try {
        const { newName : subName, newGrade : grade, newCredit : credit } = await request.json();
        const { id : _id} = params;

        await dbConnect();
         await Subjects.findByIdAndUpdate(_id ,{ subName ,grade ,credit });
    
        return NextResponse.json({message : "Subject Updates"} , {status : 200});
        
    } catch (error) {
        console.log("Error fetching sbjects",error);
        return NextResponse.json({ message: "Error fetching subjects" }, { status: 500 });
    }
   
 }

 export async function GET(request : NextRequest ){
    try {
        
        const _id  = request.nextUrl.pathname.split('/').pop();
        await dbConnect();
        const subject = await Subjects.findOne({_id});
        return NextResponse.json({subject}, {status: 200})
    } catch (error) {
        console.log("Error finding subject",error)
    }
 }