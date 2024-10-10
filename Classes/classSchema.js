import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    classDate: String,
    startTime: String,
    endTime: String,
    trainerId: { type: String, ref: "gym-users" },
    booking: [{ type: String, ref: "gym-users" }]

})

export default mongoose.model("gym-classes", classSchema)