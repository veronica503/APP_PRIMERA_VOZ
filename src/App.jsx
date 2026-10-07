import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import GuardianArea from "@/pages/GuardianArea";
import Activity from "@/pages/Activity"; // Importar Activity

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/inicio" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/guardian" 
            element={
              <ProtectedRoute>
                <GuardianArea />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/activity" 
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}