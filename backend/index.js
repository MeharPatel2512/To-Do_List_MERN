import express, { request, response } from "express"
import { PORT, mongoDbUrl } from './config.js'
import mongoose from "mongoose"
import taskRoute from './routes/tasksRoute.js'
import { Task } from './model/taskSchema.js'
import cors from 'cors'

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use(express.static('public')) 

app.use(cors())
app.use('/', taskRoute)

// Default
// Custom
// app.use(cors({
//     origin: "http://loaclhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type']
// }))


mongoose
    .connect(mongoDbUrl)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`App is listening at port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })