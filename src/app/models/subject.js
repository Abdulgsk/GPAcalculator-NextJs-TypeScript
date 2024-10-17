import mongoose from "mongoose";


const subjectSchema = new mongoose.Schema({
     subjectId: {
        type: String,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
     },
     subName: {
        type : String,
        required : true,
    },
    grade: {
       type : String,
       required : true
    },
    credit: {
        type : Number,
        required : true,
    },
    semId: {
        type: String,
        required: true,  
    }
},   
 {
        timestamps : true,
 }
);

const Subjects = mongoose.models.Subjects || mongoose.model("Subjects" , subjectSchema);

export default Subjects;