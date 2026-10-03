import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppLayout from '@/components/AppLayout';

// Page imports
import Welcome from '@/pages/Welcome';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Home from '@/pages/Home';
import AreaDetail from '@/pages/AreaDetail';
import Activity from '@/pages/Activity';
import Congratulations from '@/pages/Congratulations';
import Profile from '@/pages/Profile';
import GuardianArea from '@/pages/GuardianArea';

const FullScreenSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center surface-bg">
    <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--hairline)", borderTopColor: "#8E86FF" }}></div>
  </div>
);

// Welcome pública que redirige a usuarios ya autenticados al inicio del niño.
function WelcomePage() {
  const { isAuthenticated, authChecked } = useAuth();
  if (authChecked && isAuthenticated) return <Navigate to="/inicio" replace />;
  return <Welcome />;
}

function AppRoutes() {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return <FullScreenSpinner />;
  }

  if (authError && authError.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/niveles/:area" element={<AreaDetail />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/familias" element={<GuardianArea />} />
        </Route>
        <Route path="/area/:area" element={<Activity />} />
        <Route path="/felicitaciones/:area" element={<Congratulations />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App