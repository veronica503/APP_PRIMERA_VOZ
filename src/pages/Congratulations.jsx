import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Robot from "@/components/Robot";
import { AREAS } from "@/lib/curriculum";

export default function Congratulations() {
  const { area } = useParams();
  const navigate = useNavigate();
  const areaData = AREAS[area];

  const messages = ["¡Muy bien!", "¡Excelente!", "¡Genial!", "¡Lo lograste!", "¡Sigue así!"];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen surface-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #8E86FF, transparent)" }} />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #FF7EB3, transparent)" }} />

      <div className="relative flex flex-col items-center text-center">
        <Robot mood="celebrate" size={180} />
        <h1 className="font-display font-bold text-4xl brand-text mt-2">{msg}</h1>
        <p className="text-lg ink-text font-bold mt-2">¡Avanzaste en {areaData?.title || "tu aprendizaje"}!</p>
        <p className="muted-ink font-semibold mt-1">Vamos con la siguiente actividad</p>

        <button
          onClick={() => navigate(`/area/${area}`)}
          className="mt-8 pill-btn brand-gradient text-white px-12 h-16 text-xl"
        >
          SIGUIENTE
        </button>
        <button
          onClick={() => navigate(`/niveles/${area}`)}
          className="mt-3 font-semibold muted-ink hover:underline"
        >
          Ver mis niveles
        </button>
      </div>
    </div>
  );
}