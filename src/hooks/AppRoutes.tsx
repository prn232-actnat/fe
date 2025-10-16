import { ProtectedRoute, RejectedRoute } from '@/components'
import { Dashboard } from '@/components/Dashboard'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

export function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        { path: '', element: <Outlet /> },
        { path: 'profile', element: <Outlet /> }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        { path: 'login', element: <Outlet /> },
        { path: 'register', element: <Outlet /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to='/' />
    }
  ])
}
