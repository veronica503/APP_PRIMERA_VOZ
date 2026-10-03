import React from "react";
import { useNavigate } from "react-router-dom";
import Robot from "@/components/Robot";
import ProgressRing from "@/components/ProgressRing";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/lib/AuthContext";
import { AREAS, AREA_LIST, LEVELS, ACTIVITIES_PER_LEVEL } from "@/lib/curriculum";

function areaPct(rec) {
  if (!rec) return 0;
  const done = (rec.current_level - 1) * ACTIVITIES_PER_LEVEL + rec.current_activity;
  return Math.min(100, (done / (20 * ACTIVITIES_PER_LEVEL)) * 100);
}

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, progress, loading } = useStudent();
  const name = profile ? `${profile.first_name} ${profile.last_name}` : user?.full_name || "Estudiante";

  if (loading) {
    return <div className="min-h-[60vh] surface-bg flex items-center justify-center"><div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--hairline)", borderTopColor: "#8E86FF" }} /></div>;
  }

  return (
    <div className="surface-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Tarjeta de perfil */}
        <div className="card-tactile p-6 mb-5 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full brand-gradient flex items-center justify-center text-4xl shrink-0">
            {profile?.avatar_emoji || "🧒"}
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-2xl ink-text truncate">{name}</h1>
            <p className="text-sm muted-ink font-semibold">{profile?.grade || "Grado no asignado"} {profile?.section ? `· Sección ${profile.section}` : ""}</p>
            {profile?.nie && <p className="text-xs muted-ink font-semibold">NIE: {profile.nie}</p>}
          </div>
        </div>

        <h2 className="font-display font-bold text-lg ink-text mb-3">Mi progreso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {AREA_LIST.map((a) => {
            const area = AREAS[a];
            const rec = progress[a];
            const pct = areaPct(rec);
            return (
              <button key={a} onClick={() => navigate(`/niveles/${a}`)} className="card-tactile p-5 flex flex-col items-center text-center" style={{ borderColor: area.color + "55" }}>
                <ProgressRing progress={pct} color={area.color} size={80} />
                <span className="text-3xl mt-2">{area.emoji}</span>
                <p className="font-display font-bold ink-text mt-1">{area.title}</p>
                <p className="text-xs muted-ink font-semibold">Nivel {rec?.current_level || 1}/20</p>
              </button>
            );
          })}
        </div>

        <h2 className="font-display font-bold text-lg ink-text mb-3">Mis niveles</h2>
        <div className="space-y-4 mb-6">
          {AREA_LIST.map((a) => {
            const area = AREAS[a];
            const rec = progress[a];
            const lvl = rec?.current_level || 1;
            const lvlInfo = LEVELS[a][lvl - 1];
            return (
              <div key={a} className="card-tactile p-4 flex items-center gap-3" style={{ borderColor: area.color + "44" }}>
                <span className="text-2xl">{area.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm ink-text">{area.title}</p>
                  <p className="text-xs muted-ink font-semibold truncate">Nivel {lvl}: {lvlInfo?.title}</p>
                </div>
                <button onClick={() => navigate(`/area/${a}`)} className="pill-btn text-white px-4 h-10 text-sm" style={{ background: area.color }}>
                  Continuar
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Robot mood="happy" size={90} />
        </div>
      </div>
    </div>
  );
}