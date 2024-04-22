// import React from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { Link, useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

function Home() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:5555/tasks')
            .then((response) => {
                setTasks(response.data.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, [])

    const [name, setName] = useState('')
    const handleaddnewtask = () => {
        const data = {
            name: name
        }
        setLoading(true)
        axios
            .post('http://localhost:5555/tasks', data)
            .then(() => {
                setName('')
                axios
                    .get('http://localhost:5555/tasks')
                    .then((response) => {
                        setTasks(response.data.data);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [id, setId] = useState('')
    const [taskname, setTaskname] = useState('')
    const markasdone = (id, taskname) => {
        console.log("Hi");
        const data = {
            id: id,
            name: taskname,
            completed: true
        }
            // setLoading(true)
        axios   
            .put(`http://localhost:5555/tasks/${id}`, data)
            .then(() => {
                axios
                    .get('http://localhost:5555/tasks')
                    .then((response) => {
                        setTasks(response.data.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const markasundone = (id, taskname) => {

    }
    return (
        <div>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="flex mt-4">
                            <input value={name} onChange={(e) => {setName(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                            <button onClick={handleaddnewtask} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                        </div>
                    </div>
                    <div>

                        {loading ? (
                            <Spinner />
                        ) : (
                            <div>
                                {tasks.map((task, index) => (
                                    <div key={task.id} className="flex mb-4 items-center">
                                        {task.completed ? (
                                            <button className='border-2 rounded border-green p-2' onClick={() => markasdone(task._id, task.name)}>Done</button>
                                        ) : (
                                            <button onClick={markasundone(task._id, task.name)}>Not Done</button>
                                        )}
                                        <p className="w-full text-grey-darkest">{task.name}</p>
                                        <Link to={`/tasks/edit/${task._id}`} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-green border-green">Edit</Link>
                                        <Link to={`/tasks/delete/${task._id}`} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red">Remove</Link>
                                    </div>
                                ))}
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home
