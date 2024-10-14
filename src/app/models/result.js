import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({
     userId: {
        type: String,
        unique: true,
     },
    result: {
        type : Number,
        required : true,
    }
},   
 {
        timestamps : true,
 }
);

const Result = mongoose.models.Result || mongoose.model("Result" , resultSchema);

export default Result;