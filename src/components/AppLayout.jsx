import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import Robot from "@/components/Robot";
import { LogOut, Home as HomeIcon, Award, Users, Lock } from "lucide-react";

const navItems = [
  { to: "/", label: "Aprender", icon: HomeIcon },
  { to: "/perfil", label: "Mis Logros", icon: Award },
  { to: "/familias", label: "Familias", icon: Users },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pinOpen, setPinOpen] = useState(false);

  const handleLogout = () => {
    logout(false);
    navigate("/");
  };

  const openGuardian = () => setPinOpen(true);

  return (
    <div className="min-h-screen surface-bg flex">
      {/* Desktop left rail */}
      <aside className="hidden lg:flex flex-col w-80 shrink-0 border-r p-6" style={{ borderColor: "var(--hairline)", background: "#FFFFFF" }}>
        <div className="flex items-center gap-2 mb-6">
          <Robot mood="happy" size={44} />
          <div>
            <p className="font-display font-bold text-lg brand-text leading-none">Mi Primera Voz</p>
            <p className="text-xs muted-ink font-semibold">Aprendo jugando</p>
          </div>
        </div>

        <div className="card-tactile p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-2xl">
              {user?.full_name?.[0] || "🧒"}
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold ink-text text-sm truncate">{user?.full_name || "Estudiante"}</p>
              <p className="text-xs muted-ink truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-display font-semibold transition ${
                  isActive ? "brand-gradient text-white shadow-md" : "ink-text hover:bg-secondary"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={openGuardian}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl font-display font-semibold ink-text hover:bg-secondary transition mb-2"
        >
          <Lock className="w-5 h-5" />
          Área de Encargados
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm muted-ink hover:bg-secondary transition"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 pb-24 lg:pb-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur border-b" style={{ borderColor: "var(--hairline)" }}>
          <div className="flex items-center gap-2">
            <Robot mood="happy" size={32} />
            <span className="font-display font-bold brand-text">Mi Primera Voz</span>
          </div>
          <button onClick={openGuardian} className="w-11 h-11 rounded-full flex items-center justify-center bg-secondary" aria-label="Área de encargados">
            <Lock className="w-5 h-5 ink-text" />
          </button>
        </div>

        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t flex items-center justify-around px-2 py-2" style={{ borderColor: "var(--hairline)" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition ${
                isActive ? "brand-gradient text-white" : "muted-ink"
              }`
            }
          >
            <item.icon className="w-7 h-7" />
            <span className="text-[11px] font-bold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {pinOpen && <GuardianGate onClose={() => setPinOpen(false)} />}
    </div>
  );
}

import { useStudent } from "@/hooks/useStudent";

function GuardianGate({ onClose }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { profile } = useStudent();

  // PIN demo: últimos 4 dígitos del NIE o "1234"
  const expectedPin = profile?.nie ? profile.nie.slice(-4) : "1234";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === expectedPin) {
      onClose();
      navigate("/familias");
    } else {
      setError("PIN incorrecto. Pide ayuda a un adulto.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="card-tactile p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg ink-text">Área de Encargados</h2>
            <p className="text-sm muted-ink">Ingresa el PIN de 4 dígitos</p>
          </div>
        </div>
        {error && <div className="mb-3 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
            autoFocus
            className="w-full text-center text-3xl tracking-[0.5em] font-display font-bold h-16 rounded-2xl border-2 bg-white mb-4"
            style={{ borderColor: "var(--hairline)" }}
          />
          <button type="submit" className="w-full h-14 pill-btn brand-gradient text-white text-lg">
            Entrar
          </button>
          <button type="button" onClick={onClose} className="w-full mt-2 h-11 font-semibold muted-ink">
            Cancelar
          </button>
        </form>
        <p className="text-xs muted-ink mt-3 text-center">PIN demo: {expectedPin}</p>
      </div>
    </div>
  );
}