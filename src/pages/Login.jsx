import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AuthShell from "@/components/AuthShell";
import { Loader2 } from "lucide-react";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo !== "/" ? returnTo : "/inicio";
    } catch (err) {
      setError(err.message || "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell robotMood="happy">
      <div className="text-center mb-5">
        <h2 className="font-display font-bold text-2xl ink-text">¡Hola de nuevo!</h2>
        <p className="muted-ink font-semibold text-sm">Inicia sesión para seguir aprendiendo</p>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 text-sm font-semibold text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="font-display font-semibold ink-text text-sm" htmlFor="email">Usuario (correo)</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 rounded-2xl border-2 bg-white px-4 text-base font-semibold ink-text"
            style={{ borderColor: "var(--hairline)" }}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-display font-semibold ink-text text-sm" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 rounded-2xl border-2 bg-white px-4 text-base font-semibold ink-text"
            style={{ borderColor: "var(--hairline)" }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 pill-btn brand-gradient text-white text-lg flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Entrando...</> : "INICIAR SESIÓN"}
        </button>
      </form>
      <p className="text-center text-sm muted-ink font-semibold mt-5">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="font-bold brand-text hover:underline">Crear una cuenta</Link>
      </p>
    </AuthShell>
  );
}