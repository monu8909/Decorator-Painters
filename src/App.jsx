import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderNew from './components/HeaderNew'
import Footer from './components/Footer'
import HomePageNew from './pages/HomePageNew'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <HeaderNew />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePageNew />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

