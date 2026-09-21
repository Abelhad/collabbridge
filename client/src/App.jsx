import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/register';
import TestDashboard from './pages/TestDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path="/test-dashboard" element={<TestDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
