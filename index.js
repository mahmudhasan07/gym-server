import express from 'express'
import cors  from 'cors'
const port = 2000
const app = express()
app.use(cors({
    origin : ['http://localhost:3000'],
    credentials : true
    
}))
app.use(express.json())

app.get('/', async(req,res)=>{
    res.send({message : 'Hello World'})
})


app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})