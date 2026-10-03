import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Robot from "@/components/Robot";
import AreaCard from "@/components/AreaCard";
import { useStudent } from "@/hooks/useStudent";
import { AREAS, AREA_LIST, ACTIVITIES_PER_LEVEL } from "@/lib/curriculum";
import { useAuth } from "@/lib/AuthContext";
import { Link } from "react-router-dom";

function areaProgressPct(rec) {
  if (!rec) return 0;
  const done = (rec.current_level - 1) * ACTIVITIES_PER_LEVEL + rec.current_activity;
  return Math.min(100, (done / (20 * ACTIVITIES_PER_LEVEL)) * 100);
}

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, progress, loading } = useStudent();
  const childName = profile?.first_name || user?.full_name?.split(" ")[0] || "amiguito";

  const pcts = useMemo(() => {
    const map = {};
    for (const a of AREA_LIST) map[a] = areaProgressPct(progress[a]);
    return map;
  }, [progress]);

  const totalPct = useMemo(() => {
    const vals = AREA_LIST.map((a) => pcts[a]);
    return vals.reduce((s, v) => s + v, 0) / vals.length;
  }, [pcts]);

  // Área destacada (mayor progreso > 0, sino la primera)
  const featured = useMemo(() => {
    const started = AREA_LIST.filter((a) => pcts[a] > 0);
    if (started.length === 0) return "lectura";
    return started.sort((a, b) => pcts[b] - pcts[a])[0];
  }, [pcts]);

  if (loading) {
    return (
      <div className="min-h-[60vh] surface-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--hairline)", borderTopColor: "#8E86FF" }} />
      </div>
    );
  }

  const handleStart = (area) => navigate(`/niveles/${area}`);

  return (
    <div className="surface-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Greeting banner */}
        <div className="relative rounded-[32px] overflow-hidden p-6 sm:p-8 mb-6" style={{ background: "linear-gradient(135deg, rgba(142,134,255,0.15), rgba(255,126,179,0.15))", border: "3px solid var(--hairline)" }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold text-3xl sm:text-4xl ink-text leading-tight">¡Hola, {childName}!</p>
              <p className="muted-ink font-semibold mt-1">¡Continuemos aprendiendo juntos!</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 max-w-xs h-4 rounded-full bg-white/60 overflow-hidden" style={{ border: "2px solid var(--hairline)" }}>
                  <div className="h-full brand-gradient rounded-full transition-all" style={{ width: `${totalPct}%` }} />
                </div>
                <span className="font-display font-bold text-sm ink-text">{Math.round(totalPct)}%</span>
              </div>
            </div>
            <div className="hidden sm:block shrink-0">
              <Robot mood="wave" size={110} />
            </div>
          </div>
        </div>

        {/* Desktop: 3-card grid */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {AREA_LIST.map((a) => (
            <AreaCard key={a} areaKey={a} progress={progress} onStart={handleStart} />
          ))}
        </div>

        {/* Mobile: primary target + horizontal rail */}
        <div className="md:hidden flex flex-col gap-4">
          <PrimaryTarget area={featured} progress={progress} onStart={() => navigate(`/area/${featured}`)} />
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {AREA_LIST.map((a) => (
              <button
                key={a}
                onClick={() => handleStart(a)}
                className="card-tactile p-4 flex flex-col items-center gap-2 shrink-0 w-40"
                style={{ borderColor: AREAS[a].color + "55" }}
              >
                <span className="text-3xl">{AREAS[a].emoji}</span>
                <span className="font-display font-bold text-sm ink-text">{AREAS[a].title}</span>
                <span className="text-xs font-bold" style={{ color: AREAS[a].color }}>Nivel {progress[a]?.current_level || 1}/20</span>
              </button>
            ))}
          </div>
        </div>

        {/* No profile prompt */}
        {!profile && (
          <div className="mt-6 card-tactile p-5 text-center" style={{ borderColor: "rgba(245,158,11,0.4)" }}>
            <p className="font-display font-bold ink-text">Completa el perfil del estudiante</p>
            <p className="text-sm muted-ink font-semibold mt-1 mb-3">Para guardar tu progreso, registra los datos del niño.</p>
            <Link to="/register" className="pill-btn brand-gradient text-white px-6 h-12 inline-flex items-center">Crear perfil</Link>
          </div>
        )}
      </div>
    </div>
  );
}

function PrimaryTarget({ area, progress, onStart }) {
  const a = AREAS[area];
  const rec = progress[area];
  const level = rec?.current_level || 1;
  const activity = rec?.current_activity || 0;
  return (
    <div className="card-tactile p-5 flex flex-col items-center text-center" style={{ borderColor: a.color + "66", background: a.soft }}>
      <span className="text-5xl mb-1">{a.emoji}</span>
      <p className="font-display font-bold text-xl ink-text">{a.title}</p>
      <span className="px-3 py-1 rounded-full text-sm font-bold bg-white mt-1" style={{ color: a.color }}>Actividad {activity + 1} de {ACTIVITIES_PER_LEVEL}</span>
      <button onClick={onStart} className="pill-btn text-white px-10 h-14 text-lg mt-3 w-full" style={{ background: a.color }}>
        ¡EMPEZAR!
      </button>
    </div>
  );
}