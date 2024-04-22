// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import EditTask from './components/EditTask.jsx'
import Home from './components/Home.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      To-do List!!
      </h1>
      <Routes>
        <Route path='/tasks/edit/:id' element={<EditTask />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      <trial />
    </>
  )
}

export default App
