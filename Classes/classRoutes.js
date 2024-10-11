import express from 'express'
import classSchema from './classSchema.js'
import VerifyToken from '../VerfyToken/VerifyToken.js'
const route = express.Router()

route.post('/classes', async (req, res) => {
    const data = req.body
    const query = { $and: [{ startTime: { $lt: data.endTime } }, { endTime: { $gt: data.startTime } }, { trainerId: data.trainerId }] }
    const queryDate = { classDate: data?.classDate }
    const checkClasses = await classSchema.find(query)
    const checkDate = await classSchema.find(queryDate)
    if (checkClasses.length > 0) {
        res.status(400).json({ message: "Already class create for this trainer on this time" })
    }
    else {
        if (checkDate.length >= 5) {
            res.status(400).json({ message: "You already create 5 classes on this date" })
        }
        else {
            const result = await classSchema.insertMany(data)
            res.send(result)
        }

    }
})

route.get('/classes', VerifyToken, async (req, res) => {
    const result = await classSchema.find().populate('trainerId').sort({ classDate: 1 })
    res.send(result)
})


route.get('/class/:trainer', async (req, res) => {
    const trainer = req.params.trainer
    const query = {trainerId :  trainer }
    const result = await classSchema.find(query)
    res.send(result)


})

route.patch("/classes/:classId", async (req, res) => {
    const id = req.params.classId
    const bookId = req.body.userId
    const query = { _id: id }
    const options = { upsert: true }
    const queryDate = await classSchema.findById(query)
    const checkId = queryDate.booking.find(e => e == bookId)
    if (checkId) {
        res.status(400).send({ message: "You already booked this class" })
    }
    else {
        if (queryDate.booking.length >= 10) {
            res.status(400).send({ message: "Class schedule is full. Maximum 10 trainees allowed per schedule" })
        }
        else {
            const update = {
                $push:
                    { booking: bookId }
            }
            const result = await classSchema.updateOne(query, update, options)
            res.send(result)
        }
    }
})

route.patch('/cancelclass/:classId', async (req, res) => {
    const id = req.params.classId
    const bookId = req.body.userId
    const query = { _id: id }
    const queryDate = await classSchema.findById(query)
    const checkBooking = queryDate.booking.filter(e => e != bookId)
    const options = { upsert: true }
    const update = {
        $set:
            { booking: checkBooking }
    }
    const result = await classSchema.updateOne(query, update, options)
    res.send(result)
})


export default route