import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Make from './pages/Make'
import Take from './pages/Take'
import Settle from './pages/Settle'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">🎲 Betcha</h1>
          <p className="text-gray-600">Make. Take. Settle. Repeat.</p>
          <nav className="mt-6 flex justify-center gap-4 text-blue-500 underline">
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/make">Make</Link>
            <Link to="/take">Take</Link>
            <Link to="/settle">Settle</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/make" element={<Make />} />
            <Route path="/take" element={<Take />} />
            <Route path="/settle" element={<Settle />} />
          </Routes>
        </main>

        <footer className="text-center text-sm mt-16 text-gray-400">
          Developed by Field Trip LLC
        </footer>
      </div>
    </BrowserRouter>
  )
}
