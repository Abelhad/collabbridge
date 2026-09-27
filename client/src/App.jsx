import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute'
import CreatorDashboard from './pages/creator/CreatorDashboard'
import BusinessDashboard from './pages/business/BusinessDashboard'
import BusinessProfile from './pages/business/BusinessProfile'
import CreatorProfile from './pages/creator/CreatorProfile'
import DashboardLayout from './layouts/DashboardLayout'
import BusinessCampaigns from './pages/business/BusinessCampaigns'
import CreateCampaign from './pages/business/CreateCampaign'
import CreatorCampaigns from './pages/creator/CreatorCampaigns'
import CampaignDetails from './pages/creator/CampaignDetails'
import CreatorApplications from './pages/creator/CreatorApplications'

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
                <DashboardLayout>
                  <CreatorDashboard />
                </DashboardLayout>
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

        <Route 
          path='/business/profile'
          element={
            <ProtectedRoute role="business">
              <BusinessProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator/profile"
          element={
            <ProtectedRoute role="creator">
                <DashboardLayout>
                  <CreatorProfile />
                </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business/campaigns"
          element={
            <ProtectedRoute role="business">
                <DashboardLayout>
                    <BusinessCampaigns />
                </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business/campaigns/create"
          element={
              <ProtectedRoute role="business">
                  <DashboardLayout>
                      <CreateCampaign />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

        <Route
          path="/creator/campaigns"
          element={
              <ProtectedRoute role="creator">
                  <DashboardLayout>
                      <CreatorCampaigns />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

        <Route
          path="/creator/campaigns/:id"
          element={
              <ProtectedRoute role="creator">
                  <DashboardLayout>
                      <CampaignDetails />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

        <Route
          path="/creator/applications"
          element={
              <ProtectedRoute role="creator">
                  <DashboardLayout>
                      <CreatorApplications />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App
