import mongoose from "mongoose";

global.mongoose = {
    conn : null,
    promise : null,
};


export async function dbConnect() {
    try {
        if(global.mongoose && global.mongoose.conn) {
            console.log("Returning connection from previous");
            return global.mongoose.conn;
        }
        else{
            const connect = process.env.DATABASE_URI;
    
            const promise = mongoose.connect(connect, {
                autoIndex : true,
            });
    
            console.log("Sucessfully Connected to DataBase");
            return await promise;
        }
        
    } catch (error) {
        console.log("Error Connecting with DB",error)
    }
} 