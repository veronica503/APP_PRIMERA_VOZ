import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Robot from "@/components/Robot";
import { useStudent } from "@/hooks/useStudent";
import { AREAS, LEVELS, getActivities, ACTIVITIES_PER_LEVEL } from "@/lib/curriculum";
import ListenChoose from "@/components/activities/ListenChoose";
import TraceLetter from "@/components/activities/TraceLetter";
import RepeatSpeak from "@/components/activities/RepeatSpeak";
import Comprehension from "@/components/activities/Comprehension";
import { ArrowLeft, Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";

export default function Activity() {
  const { area } = useParams();
  const navigate = useNavigate();
  const { profile, progress, ensureProgress, advanceActivity, loading } = useStudent();
  const [ready, setReady] = useState(false);
  const areaData = AREAS[area];

  useEffect(() => {
    if (!areaData || loading) return;
    (async () => {
      await ensureProgress(area);
      setReady(true);
    })();
  }, [area, areaData, loading, ensureProgress]);

  if (!areaData) return <NotFound />;
  if (loading || !ready) return <Loading color={areaData.color} />;
  if (!profile) return <NoProfile />;

  const rec = progress[area];
  if (!rec) return <Loading color={areaData.color} />;

  const level = rec.current_level;
  const activityIndex = rec.current_activity;
  const levelInfo = LEVELS[area][level - 1];
  const activities = getActivities(area, level);
  const activity = activities[activityIndex];

  const isLast = level === 20 && activityIndex >= ACTIVITIES_PER_LEVEL - 1;

  const handleComplete = async () => {
    await advanceActivity(area);
    if (isLast) {
      navigate(`/niveles/${area}`);
    } else {
      navigate(`/felicitaciones/${area}`);
    }
  };

  return (
    <div className="min-h-screen surface-bg flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between max-w-3xl mx-auto w-full">
        <button onClick={() => navigate(`/niveles/${area}`)} className="w-11 h-11 rounded-full bg-white flex items-center justify-center" style={{ border: "2px solid var(--hairline)" }}>
          <ArrowLeft className="w-5 h-5 ink-text" />
        </button>
        <div className="text-center">
          <p className="font-display font-bold text-lg ink-text">{areaData.emoji} {areaData.title}</p>
          <p className="text-xs muted-ink font-semibold">Nivel {level} · Actividad {activityIndex + 1} de {ACTIVITIES_PER_LEVEL}</p>
        </div>
        <div className="w-11" />
      </div>

      {/* Robot + instrucción */}
      <div className="flex flex-col items-center px-4 max-w-2xl mx-auto w-full">
        <Robot mood="explain" size={100} />
        <div className="card-tactile px-5 py-3 mt-2 mb-6 text-center max-w-md">
          <p className="font-display font-bold text-lg ink-text">{activity?.instruction || "¡Vamos a practicar!"}</p>
        </div>
      </div>

      {/* Área de interacción */}
      <div className="flex-1 px-4 pb-8 max-w-2xl mx-auto w-full flex flex-col items-center justify-start">
        {!activity ? (
          <p className="muted-ink font-semibold">No hay actividad disponible.</p>
        ) : activity.type === "escuchar" ? (
          <ListenChoose activity={activity} onComplete={handleComplete} />
        ) : activity.type === "trazar" ? (
          <TraceLetter activity={activity} onComplete={handleComplete} />
        ) : activity.type === "repetir" ? (
          <RepeatSpeak activity={activity} onComplete={handleComplete} />
        ) : activity.type === "comprension" ? (
          <Comprehension activity={activity} onComplete={handleComplete} />
        ) : (
          <ListenChoose activity={activity} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}

function Loading({ color }) {
  return (
    <div className="min-h-screen surface-bg flex items-center justify-center">
      <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--hairline)", borderTopColor: color }} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen surface-bg flex items-center justify-center">
      <p className="font-display font-bold text-xl muted-ink">Área no encontrada</p>
    </div>
  );
}

function NoProfile() {
  return (
    <div className="min-h-screen surface-bg flex flex-col items-center justify-center p-6 text-center">
      <Robot mood="happy" size={120} />
      <p className="font-display font-bold text-xl ink-text mt-2">¡Falta crear el perfil!</p>
      <p className="muted-ink font-semibold mt-1 mb-4">Pide a un adulto que registre tus datos para empezar a aprender.</p>
      <Link to="/register" className="pill-btn brand-gradient text-white px-8 h-12">Crear perfil</Link>
    </div>
  );
}