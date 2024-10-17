import { dbConnect } from "@/app/_lib/mongoose";
import Result from "@/app/models/result";
import Semster from "@/app/models/semster";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { result, name, semId } = await request.json();
        await dbConnect();

        const updatedResult = await Result.findOneAndUpdate(
            { semId },
            { result, name },
            { new: true, upsert: true } 
        );
        
        const updatedSemster = await Semster.findOneAndUpdate(
            { _id : semId},
            {result},
            { upsert: true } 
        );
        return NextResponse.json(
            { message: "Result Successfully Created or Updated", data: updatedResult },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding result:", error);
        return NextResponse.json(
            { message: "Error adding result" },
            { status: 500 }
        );
    }
}
