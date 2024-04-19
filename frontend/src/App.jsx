// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CreateTask from './components/CreateTask.jsx'
import DeleteTask from './components/DeleteTask.jsx'
import EditTask from './components/EditTask.jsx'
import ShowTask from './components/ShowTask.jsx'
import Home from './components/Home.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      To-do List!!
      </h1>
      <Routes>
        <Route path='/tasks/create' element={<CreateTask />}></Route>
        <Route path='/tasks/delete/:id' element={<DeleteTask />}></Route>
        <Route path='/tasks/edit/:id' element={<EditTask />}></Route>
        <Route path='/tasks/show:id' element={<ShowTask />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      <trial />
    </>
  )
}

export default App
