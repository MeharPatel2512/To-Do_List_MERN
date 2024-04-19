// import React from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
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
      {/* <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="flex mt-4">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                                <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex mb-4 items-center">
                            <p className="w-full text-grey-darkest">Add another component to Tailwind Components</p>
                            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                        </div>
                        <div className="flex mb-4 items-center">
                            <p className="w-full line-through text-green">Submit Todo App Component to Tailwind Components</p>
                            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                        </div>
                    </div>
                </div>
            </div> */}
        
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>To-Do List</h1>
                <Link to="/tasks/create">
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>

            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>Serial No.</th>
                            <th className='border border-slate-600 rounded-md'>Task Name</th>
                            <th className='border border-slate-600 rounded-md'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {task.name}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {task.completed}
                                </td>
                                <td className='flex border border-slate-700 rounded-md text-center'>
                                    <Link to={`/tasks/details/${task._id}`} className='ml-8 mr-5'>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/tasks/edit/${task._id}`} className='mr-5'>
                                        <AiOutlineEdit className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/tasks/delete/${task._id}`}>
                                        <MdOutlineDelete className='text-2xl text-green-800' />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    </div>
  )
}

export default Home
