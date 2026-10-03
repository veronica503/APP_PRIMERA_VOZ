import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";
import { AREAS, LEVELS, ACTIVITIES_PER_LEVEL } from "@/lib/curriculum";
import Robot from "@/components/Robot";
import { ArrowLeft, Lock, CheckCircle2, Play } from "lucide-react";

export default function AreaDetail() {
  const { area } = useParams();
  const navigate = useNavigate();
  const { profile, progress, ensureProgress, loading } = useStudent();
  const [ready, setReady] = useState(false);
  const areaData = AREAS[area];

  useEffect(() => {
    if (!areaData || loading) return;
    (async () => {
      await ensureProgress(area);
      setReady(true);
    })();
  }, [area, areaData, loading, ensureProgress]);

  if (!areaData) return <div className="min-h-screen surface-bg flex items-center justify-center"><p className="muted-ink font-bold">Área no encontrada</p></div>;
  if (loading || !ready) return <div className="min-h-screen surface-bg flex items-center justify-center"><div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--hairline)", borderTopColor: areaData.color }} /></div>;
  if (!profile) return (
    <div className="min-h-screen surface-bg flex flex-col items-center justify-center p-6 text-center">
      <Robot mood="happy" size={120} />
      <p className="font-display font-bold text-xl ink-text mt-2">¡Falta crear el perfil!</p>
      <p className="muted-ink font-semibold mt-1 mb-4">Pide a un adulto que registre tus datos.</p>
      <button onClick={() => navigate("/register")} className="pill-btn brand-gradient text-white px-8 h-12">Crear perfil</button>
    </div>
  );

  const rec = progress[area];
  const currentLevel = rec?.current_level || 1;
  const currentActivity = rec?.current_activity || 0;
  const levels = LEVELS[area] || [];

  return (
    <div className="min-h-screen surface-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate("/")} className="w-11 h-11 rounded-full bg-white flex items-center justify-center" style={{ border: "2px solid var(--hairline)" }}>
            <ArrowLeft className="w-5 h-5 ink-text" />
          </button>
          <div>
            <h1 className="font-display font-bold text-2xl ink-text">{areaData.emoji} {areaData.title}</h1>
            <p className="text-sm muted-ink font-semibold">20 niveles · {rec?.completed_activities_total || 0} actividades completadas</p>
          </div>
        </div>

        {/* Nivel actual destacado */}
        <div className="card-tactile p-5 mb-5 flex items-center gap-4" style={{ borderColor: areaData.color + "55" }}>
          <Robot mood="explain" size={70} />
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: areaData.color }}>NIVEL {currentLevel}</p>
            <p className="font-display font-bold text-lg ink-text">{levels[currentLevel - 1]?.title}</p>
            <p className="text-xs muted-ink font-semibold">Actividad {currentActivity + 1} de {ACTIVITIES_PER_LEVEL}</p>
          </div>
          <button onClick={() => navigate(`/area/${area}`)} className="pill-btn text-white px-6 h-12" style={{ background: areaData.color }}>
            <Play className="w-5 h-5 mr-1" /> Continuar
          </button>
        </div>

        {/* Lista de niveles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {levels.map((lvl, i) => {
            const num = i + 1;
            const isCompleted = num < currentLevel;
            const isCurrent = num === currentLevel;
            const isLocked = num > currentLevel;
            return (
              <button
                key={num}
                disabled={isLocked}
                onClick={() => isLocked ? null : navigate(`/area/${area}`)}
                className={`card-tactile p-4 flex items-center gap-3 text-left transition ${isLocked ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"}`}
                style={{ borderColor: isCurrent ? areaData.color : "var(--hairline)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg shrink-0"
                  style={{
                    background: isCompleted ? areaData.soft : isCurrent ? areaData.color : "var(--hairline)",
                    color: isCompleted ? areaData.color : isCurrent ? "#fff" : "var(--muted-ink)",
                  }}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : isLocked ? <Lock className="w-5 h-5" /> : num}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm ink-text truncate">Nivel {num}: {lvl.title}</p>
                  <p className="text-xs muted-ink font-semibold truncate">{lvl.skill} · {lvl.stage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}