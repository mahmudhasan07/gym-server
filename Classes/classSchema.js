import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    classDate : String,
     classTime : String, 
     trainerId : {type : String, ref : "gym-users"}
})

export default mongoose.model("gym-classes", classSchema)