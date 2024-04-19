import express from 'express'
import { Task } from '../model/taskSchema.js'

const router = express.Router()

router.get("/", (request, response) => {
    return response.status(234).send('Welcome!!')
})

router.post('/tasks', async (req, res) => {
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

router.get("/tasks", async (req, res) => {
    try{
        const tasks = await Task.find({})
        return res.status(200).json({
            count : tasks.length,
            data : tasks
        })
    }
    catch(err){
        console.log(err);
    }
})

router.get("/tasks/:id", async (req, res) => {
    try{
        const {id} = req.params
        const task = await Task.findById(id)
        return res.status(200).json(task)
    }
    catch(err){
        console.log(err);
    }
})

router.put('/tasks/:id', async (req, res) => {
    try{
        if(
            !req.body.name
        ){
            return res.status(400).send("Please provide all the required fields")
        }

        const { id } = req.params

        const result = await Task.findByIdAndUpdate(id, req.body)
        
        if(!result){
            return res.status(404).json({"message" : "Task not found"})
        }
        return res.status(200).send({"message" : "Task Updated!!", "data" : result})
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try{
        const {id} = req.params

        const result = await Task.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({"message" : "Task not found"})
        }
        return res.status(200).json({"message" : "Task Deleted!!", "data" : result})
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message)
    }
})

export default router