import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    photo: String,
    role: String

})


export default mongoose.model("gym-users", userSchema)