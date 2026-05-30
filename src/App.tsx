import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { AnalyzePage } from '@/pages/AnalyzePage'
import { ProfilesPage } from '@/pages/ProfilesPage'
import { ProfileDetailPage } from '@/pages/ProfileDetailPage'
import { SearchPage } from '@/pages/SearchPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { ActivityPage } from '@/pages/ActivityPage'
import { AuthCallbackPage } from '@/pages/AuthCallbackPage'
import { ComparePage } from '@/pages/ComparePage'
import { useAuthStore } from '@/store/authStore'

function App() {
  const authenticated = useAuthStore((s) => !!s.accessToken)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={authenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
        />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/profiles/:username" element={<ProfileDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/activity" element={<ActivityPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
