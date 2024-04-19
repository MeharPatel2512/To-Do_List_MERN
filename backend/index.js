import express, { request } from "express"
import { PORT, mongoDbUrl } from './config.js'
import mongoose from "mongoose"
import { Task } from "./model/taskSchema.js"

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use(express.static('public'))    

app.get("/", (request, response) => {
    return response.status(234).send('Welcome!!')
})

app.post('/tasks', async (req, res) => {
    try{
        if(
            !req.body.name
        ){
            return res.status(400).send("Please provide all the required fields")
        }
        
        const newtask = {
            name : req.body.name
        }
        const task = await Task.create(newtask)
        return res.status(201).send(task)
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message)
    }
})

app.get("/tasks", async (req, res) => {
    try{
        const tasks = await Task.find({})
        return res.status(200).send(tasks)
    }
    catch(err){
        console.log(err);
    }
})

app.post('/checkcomplete:id', async (req, res) => {
    try{
        console.log(req.params);
    }
    catch(err){
        console.log(err);
    }
})

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