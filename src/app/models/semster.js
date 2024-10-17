import mongoose from "mongoose";


const semsterSchema = new mongoose.Schema({
     title: {
        type : String,
        required : true,
    },
    userId: {
        type: String,
        required: true,  
    },
    result: {
        type : Number,
        default : 0,
    }
},   
 {
        timestamps : true,
 }
);

const Semster = mongoose.models.Semster || mongoose.model("Semster" , semsterSchema);

export default Semster;