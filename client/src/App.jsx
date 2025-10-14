import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import Dashboard from './components/Dashbord'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupForm from './components/Signup'
import StudentForm from './components/Studentform'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Footer from './components/Footer'


function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <div className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studentform" element={<StudentForm />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
