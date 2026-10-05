// components/RequireAuth.jsx  (novo)
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

export function RequireAuth() {
  const { usuario, carregando } = useAuth()
  const local = useLocation()

  if (carregando) return <p className="text-body" role="status">Carregando...</p>
  if (!usuario) return <Navigate to="/login" replace state={{ de: local.pathname }} />
  return <Outlet />
}

export function SomenteVisitante() {
  const { usuario, carregando } = useAuth()
  if (carregando) return null
  return usuario ? <Navigate to="/app" replace /> : <Outlet />
}