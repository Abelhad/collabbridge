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
import BusinessApplications from './pages/business/BusinessApplications'
import EditCreatorProfile from './pages/creator/EditCreatorProfile'
import EditBusinessProfile from './pages/business/EditBusinessProfile'
import EditCampaign from './pages/business/EditCampaign'

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
                  <DashboardLayout>
                    <BusinessDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
            }
        />

        <Route 
          path='/business/profile'
          element={
            <ProtectedRoute role="business">
              <DashboardLayout>
                <BusinessProfile />
              </DashboardLayout>
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

        <Route
          path="/business/applications"
          element={
              <ProtectedRoute role="business">
                  <DashboardLayout>
                      <BusinessApplications />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

        <Route
          path="/creator/profile/edit"
          element={
              <ProtectedRoute role="creator">
                  <DashboardLayout>
                      <EditCreatorProfile />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

        <Route 
          path="/business/profile/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditBusinessProfile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business/campaigns/:id/edit"
          element={
              <ProtectedRoute role="business">
                  <DashboardLayout>
                      <EditCampaign />
                  </DashboardLayout>
              </ProtectedRoute>
          }
        />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App
