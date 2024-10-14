import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
     userId: {
        type: String,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
     },
     name: {
        type : String,
        unique : true,
        required : true,
    },
    password: {
        type : String,
        required : true,
    }
},   
 {
        timestamps : true,
 }
);

const User = mongoose.models.User || mongoose.model("User" , userSchema);

export default User;