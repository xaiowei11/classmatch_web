import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import CourseQueryPage from './pages/CourseQueryPage.jsx'
import RoleSelectPage from './pages/RoleSelectPage.jsx'
import StudentHome from './pages/StudentHome.jsx'
import TeacherHome from './pages/TeacherHome.jsx'
import AdminHome from './pages/AdminHome.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/query" element={<CourseQueryPage />} />
      <Route path="/roleselect" element={<RoleSelectPage />} />
      <Route path="/studenthome" element={<StudentHome />} />
      <Route path="/teacherhome" element={<TeacherHome />} />
      <Route path="/adminhome" element={<AdminHome />} />
    </Routes>
  )
}

export default App