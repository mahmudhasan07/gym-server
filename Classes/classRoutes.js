import express from 'express'
import classSchema from './classSchema.js'
const route = express.Router()

route.post('/classes', async (req, res) => {
    const data = req.body
    const query = { $and: [{ classTime: data.classTime }, { trainerId: data.trainerId }] }
    const queryDate = { classDate: data?.classDate }
    const checkClasses = await classSchema.find(query)
    const checkDate = await classSchema.find(queryDate)
    console.log(checkDate.length);
    
    if (checkClasses.length > 0) {
        res.send({ message: "Already class create for this trainer on this time" })
    }
    else {
        if (checkDate.length >= 5) {
            res.send({ message: "You already create 5 classes on this date" })
        }
        else {
            const result = await classSchema.insertMany(data)
            res.send(result)
        }

    }
})


route.get('/classes', async (req, res) => {
    const result = await classSchema.find()
    res.send(result)
})


export default route