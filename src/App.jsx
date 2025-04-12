import { useState } from 'react'
import logo from './assets/Frame 13.png'
import './App.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Board from './components/board'

function App() {
 

  return (
    <>
      <div>
        <Navbar/>
        <div className="dashboard">
          <Sidebar/>
          <Board/>
        </div>
      </div>
    </>
  )
}

export default App
