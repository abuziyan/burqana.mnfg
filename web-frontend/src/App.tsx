
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import RegularDashboard from './pages/RegularDashboard'
import SewerDashboard from './pages/SewerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import HRDashboard from './pages/HRDashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function PrivateRoute({ children, roles }: { children: JSX.Element, roles?: string[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role.toLowerCase())) return <Navigate to="/login" />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regular" element={<PrivateRoute roles={['regular']}><RegularDashboard /></PrivateRoute>} />
        <Route path="/sewer" element={<PrivateRoute roles={['sewer']}><SewerDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/hr" element={<PrivateRoute roles={['hr manager','hr']}><HRDashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  )
}
