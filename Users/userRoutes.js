import express from "express"
import userSchema from "./userSchema.js"
import jwt from 'jsonwebtoken'
import VerifyToken from "../VerfyToken/VerifyToken.js"
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
    if (query.role) {
        const result = await userSchema.find(query)
        res.send(result)
    }
    else {
        const result = await userSchema.find()
        res.send(result)
    }
})

route.get('/user/:email', async (req, res) => {
    const email = req.params.email
    const query = { "email": email }
    if (req.user.email == email) {
        const result = await userSchema.findOne(query)
        res.send(result)
    }
    else{
        res.status(403).send({
            "success": false,
            "message": "Unauthorized access.",
        })
    }

})


route.patch('/update/:email', async (req, res) => {
    const email = req.params.email
    const data = req.body
    const query = { email: email }
    const options = { upsert: true }
    const updateDoc = {
        $set: {
            name: data?.updateName,
            photo: data?.updateImage
        }
    }
    const result = await userSchema.updateOne(query, updateDoc, options)
    res.send(result)

})


route.post("/jwt", async (req, res) => {
    const email = req.body
    const token = jwt.sign(email, process.env.user_token, { expiresIn: "1h" })
    res
        .cookie("token", token,
            {
                httpOnly: false,
                secure: true,
                sameSite: "none"
            })
        .send(token)

})

export default route