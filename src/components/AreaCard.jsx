import React from "react";
import ProgressRing from "@/components/ProgressRing";
import { AREAS, ACTIVITIES_PER_LEVEL } from "@/lib/curriculum";

export default function AreaCard({ areaKey, progress, onStart }) {
  const area = AREAS[areaKey];
  const rec = progress?.[areaKey];
  const level = rec?.current_level || 1;
  const activity = rec?.current_activity || 0;
  const levelPct = (activity / ACTIVITIES_PER_LEVEL) * 100;
  const actionLabel = area.action;

  return (
    <div
      className="card-tactile p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{ borderColor: area.color + "55" }}
    >
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ background: area.color }}
      />
      <div className="flex items-start justify-between relative">
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl"
          style={{ background: area.soft, border: `3px solid ${area.color}40` }}
        >
          {area.emoji}
        </div>
        <ProgressRing progress={levelPct} color={area.color} size={64} />
      </div>
      <div className="relative">
        <h3 className="font-display font-bold text-2xl ink-text">{area.title}</h3>
        <p className="text-sm muted-ink font-semibold mt-1">{area.description}</p>
      </div>
      <div className="flex items-center justify-between relative">
        <div>
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-bold"
            style={{ background: area.soft, color: area.color }}
          >
            Nivel {level}/20
          </span>
          <p className="text-xs muted-ink mt-1 font-semibold">Actividad {activity + 1} de {ACTIVITIES_PER_LEVEL}</p>
        </div>
        <button
          onClick={() => onStart(areaKey)}
          className="pill-btn px-6 h-12 text-white text-base"
          style={{ background: area.color }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}