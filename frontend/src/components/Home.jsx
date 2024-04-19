// import React from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

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
    return (
        <div>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="flex mt-4">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                            <Link to="/tasks/create" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</Link>
                        </div>
                    </div>
                    <div>

                        {loading ? (
                            <Spinner />
                        ) : (
                            <div>
                                {tasks.map((task, index) => (
                                    <div key={task.id} className="flex mb-4 items-center">
                                        <Link to={`/tasks/edit/${task._id}`}>x</Link>
                                        <p className="w-full text-grey-darkest">{task.name}</p>
                                        <Link to={`/tasks/edit/${task._id}`} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Edit</Link>
                                        <Link to={`/tasks/delete/${task._id}`} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</Link>
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
