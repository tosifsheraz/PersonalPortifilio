import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AuthGuard } from './components/admin/AuthGuard'
import { AdminPanel } from './components/admin/AdminPanel'
import { LoginPage } from './components/admin/LoginPage'
import { Portfolio } from './pages/Portfolio'
import { createLenis } from './lib/lenis'

export default function App() {
  useEffect(() => {
    const lenis = createLenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard/*"
            element={
              <AuthGuard>
                <AdminPanel />
              </AuthGuard>
            }
          />
          <Route path="/admin" element={<AuthGuard><AdminPanel /></AuthGuard>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
