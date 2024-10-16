import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import 'dotenv/config'
import userRoute from './Users/userRoutes.js'
import classRoute from './Classes/classRoutes.js'
import cookieParser  from "cookie-parser"
const port = 2000
const app = express()
app.use(cors({
    origin: ['https://gym-client-fawn.vercel.app','http://localhost:3000'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

async function Run() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.oqk84kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        app.use('/', userRoute)
        app.use('/', classRoute)
        console.log("mongoose connected");
    }
    catch {
        console.log("mongoose not connected");

    }
}

Run()

app.get('/', async (req, res) => {
    res.send({ message: 'Hello World' })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})