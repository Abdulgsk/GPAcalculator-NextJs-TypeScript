import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({
     name: {
        type: String,
     },
    result: {
        type : Number,
        required : true,
    },
    semId: {
        type : String,
        required : true,
    }
},   
 {
        timestamps : true,
 }
);

const Result = mongoose.models.Result || mongoose.model("Result" , resultSchema);

export default Result;