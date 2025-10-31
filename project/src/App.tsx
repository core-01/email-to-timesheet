import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmailsPage } from './pages/EmailsPage';
import { TicketsPage } from './pages/TicketsPage';
import { TimesheetsPage } from './pages/TimesheetsPage';
import { UsersPage } from './pages/UsersPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { LogsPage } from './pages/LogsPage';
import { UserRole } from './types';

function App() {
  const { mode } = useAppSelector((state) => state.theme);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/emails"
          element={
            <ProtectedRoute>
              <Layout>
                <EmailsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Layout>
                <TicketsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheets"
          element={
            <ProtectedRoute>
              <Layout>
                <TimesheetsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <Layout>
                <UsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
              <Layout>
                <IntegrationsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <Layout>
                <LogsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
