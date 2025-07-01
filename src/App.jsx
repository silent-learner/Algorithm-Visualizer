import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Sorting from './pages/Sorting'
import Graph from './pages/Graph'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'


function App() {

  return (
    <Router basename='/Algorithm-Visualizer'>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <NavBar />
        <main className='flex-grow flex justify-center p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sorting' element={<Sorting />} />
            <Route path='/graph' element={<Graph />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
