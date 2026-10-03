import React from "react";
import Robot from "@/components/Robot";

// Contenedor visual para pantallas de bienvenida, login y registro.
export default function AuthShell({ children, robotMood = "wave", showRobot = true }) {
  return (
    <div className="min-h-screen surface-bg flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #8E86FF, transparent)" }} />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #FF7EB3, transparent)" }} />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-display font-bold text-3xl brand-text">Mi Primera Voz</h1>
          <p className="muted-ink text-sm font-semibold mt-1">Aprendo a hablar, leer y escribir</p>
        </div>
        {showRobot && (
          <div className="flex justify-center mb-2">
            <Robot mood={robotMood} size={120} />
          </div>
        )}
        <div className="card-tactile p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}