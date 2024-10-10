import express from "express"
import userSchema from "./userSchema.js"
const route = express.Router()

route.post('/users', async (req, res) => {
    const data = req.body
    console.log(data);

    const result = await userSchema.insertMany(data)
    res.send(result)
})

route.get("/users", async (req, res) => {
    const data = req.query
    const query = { "role": data.data }
    if (query) {
        const result = await userSchema.find(query)
        res.send(result)

    }
    else {
        const result = await userSchema.find()
        res.send(result)
    }
})




export default route