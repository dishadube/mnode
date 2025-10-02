import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './Signup'
import Login from './Login'
import Dashboard from './Dashbord'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentForm from './Studentform'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studentform" element={<StudentForm />} />
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App
