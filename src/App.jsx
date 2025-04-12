import './App.css'

import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Board from './components/board'

function App() {
 

  return (
    <>
      
        <Navbar/>
        <div className="dashboard">
          <Sidebar/>
          <Board/>
        </div>

    </>
  )
}

export default App
