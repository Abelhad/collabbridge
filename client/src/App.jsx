import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute'
import CreatorDashboard from './pages/creator/CreatorDashboard'
import BusinessDashboard from './pages/business/BusinessDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route
          path="/creator/dashboard"
          element={
              <ProtectedRoute role="creator">
                  <CreatorDashboard />
              </ProtectedRoute>
          }
        />

        <Route
            path="/business/dashboard"
            element={
                <ProtectedRoute role="business">
                    <BusinessDashboard />
                </ProtectedRoute>
            }
        />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
