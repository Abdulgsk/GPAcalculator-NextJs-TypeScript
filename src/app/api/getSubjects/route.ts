import { dbConnect } from "@/app/_lib/mongoose";
import Subjects from "@/app/models/subject";
import { NextResponse } from "next/server";


export async function GET(request : Request) {

    try {
        const { searchParams } = new URL(request.url);

        const userId = searchParams.get('userId');
    
        await dbConnect();
    
        const subjects = await Subjects.find({ userId });
    
        return NextResponse.json(subjects , {status : 200});
        
    } catch (error) {
        console.log("Error fetching sbjects",error);
        return NextResponse.json({ message: "Error fetching subjects" }, { status: 500 });
    }



}