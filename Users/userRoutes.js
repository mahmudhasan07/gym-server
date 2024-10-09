import express from "express"
import userSchema from "./userSchema.js"
const route = express.Router()

route.post('/users', async (req, res) => {
    const data = req.body
    console.log(data);
    
    const result = await userSchema.insertMany(data)
    res.send(result)
})

route.get("/users", async(req,res)=>{
    const result = await userSchema.find()
    res.send(result)
})


export default route