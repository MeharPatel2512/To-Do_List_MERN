// import React from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

function Home() {
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

    const markasdone = (id, taskname) => {
        const data = {
            id: id,
            name: taskname,
            completed: true
        }
        setLoading(true)
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
        const data = {
            id: id,
            name: taskname,
            completed: false
        }
        setLoading(true)
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

    const handleremovetask = (id) => {
        setLoading(true)
        axios
            .delete(`http://localhost:5555/tasks/${id}`)
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

    const [editdiv, setEditDiv] = useState(false)
    const [newname, setNewname] = useState('')
    const [editId, setEditId] = useState('')
    const [editStatus, setEditStatus] = useState(false)
    const editbtnclick = (id, name, status) => {
        setEditDiv(true)
        setNewname(name)
        setEditId(id)
        setEditStatus(status)
        console.log(editId, newname, editStatus);
    }
    const handleedittask = () => {
        setLoading(true)
        const data = {
            id: editId,
            name: newname,
            completed: editStatus
        }
        axios
            .put(`http://localhost:5555/tasks/${editId}`, data)
            .then(() => {
                axios
                    .get('http://localhost:5555/tasks')
                    .then((response) => {
                        setTasks(response.data.data)
                        setLoading(false)
                        setEditDiv(false)
                        setEditId('')
                        setNewname('')
                        setEditStatus('')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        {editdiv == true ? (
                            <div className="flex mt-4">
                                <input value={newname} onChange={(e) => { setNewname(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                                <button onClick={handleedittask} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Edit</button>
                            </div>
                        ) : (
                            <div className="flex mt-4">
                                <input value={name} onChange={(e) => { setName(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                                <button onClick={handleaddnewtask} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                            </div>
                        )}
                    </div>
                    <div>

                        {loading ? (
                            <Spinner />
                        ) : (
                            <div>
                                {tasks.map((task, index) => (

                                    <div key={task._id} className="flex mb-4 items-center">
                                        <div className='hidden'>
                                            {index}
                                        </div>
                                        {task.completed == true ? (
                                            <input className='p-2' type="checkbox" name="done" onClick={() => { markasundone(task._id, task.name) }} checked />
                                        ) : (
                                            <input type="checkbox" name="notdone" onClick={() => { markasdone(task._id, task.name) }} />
                                        )}
                                        {task.completed == true ? (
                                            <p className="w-full donetaskname"><s>{task.name}</s></p>
                                        ) : (
                                            <p className="w-full notdonetaskname">{task.name}</p>
                                        )}
                                        <button onClick={() => { editbtnclick(task._id, task.name, task.completed) }} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-green border-green">Edit</button>
                                        <button onClick={() => { handleremovetask(task._id) }} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red">Remove</button>
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
