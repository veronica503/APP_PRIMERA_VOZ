import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Robot from "@/components/Robot";
import ProgressRing from "@/components/ProgressRing";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { AREAS, AREA_LIST, LEVELS, ACTIVITIES_PER_LEVEL } from "@/lib/curriculum";
import { ArrowLeft, GraduationCap, Mail, Phone } from "lucide-react";

function areaPct(rec) {
  if (!rec) return 0;
  const done = (rec.current_level - 1) * ACTIVITIES_PER_LEVEL + rec.current_activity;
  return Math.min(100, (done / (20 * ACTIVITIES_PER_LEVEL)) * 100);
}

export default function GuardianArea() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, progress, loading } = useStudent();
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    if (!profile?.id) return;
    (async () => {
      try {
        const recs = await base44.entities.Assessment.filter({ student_profile_id: profile.id });
        setAssessments(recs);
      } catch (e) {
        setAssessments([]);
      }
    })();
  }, [profile?.id]);

  if (loading) {
    return <div className="min-h-screen surface-bg flex items-center justify-center"><div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--hairline)", borderTopColor: "#8E86FF" }} /></div>;
  }

  return (
    <div className="surface-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate("/")} className="w-11 h-11 rounded-full bg-white flex items-center justify-center" style={{ border: "2px solid var(--hairline)" }}>
            <ArrowLeft className="w-5 h-5 ink-text" />
          </button>
          <div>
            <h1 className="font-display font-bold text-2xl ink-text">Área de Encargados</h1>
            <p className="text-sm muted-ink font-semibold">Información y progreso del estudiante</p>
          </div>
        </div>

        {/* Datos del estudiante */}
        <div className="card-tactile p-5 mb-5">
          <h2 className="font-display font-bold text-lg ink-text mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Datos del estudiante
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Info label="Nombres" value={profile?.first_name} />
            <Info label="Apellidos" value={profile?.last_name} />
            <Info label="NIE" value={profile?.nie} />
            <Info label="Edad" value={profile?.age} />
            <Info label="Grado" value={profile?.grade} />
            <Info label="Sección" value={profile?.section} />
          </div>
        </div>

        {/* Datos del encargado */}
        <div className="card-tactile p-5 mb-5">
          <h2 className="font-display font-bold text-lg ink-text mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5" /> Datos del encargado
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Info label="Nombre" value={`${profile?.guardian_first_name || ""} ${profile?.guardian_last_name || ""}`.trim()} />
            <Info label="Edad" value={profile?.guardian_age} />
            <Info label="Género" value={profile?.guardian_gender} />
            <Info label="Correo" value={profile?.guardian_email || user?.email} />
          </div>
        </div>

        {/* Progreso por área */}
        <h2 className="font-display font-bold text-lg ink-text mb-3">Progreso por área</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {AREA_LIST.map((a) => {
            const area = AREAS[a];
            const rec = progress[a];
            const pct = areaPct(rec);
            const completedLevels = (rec?.current_level || 1) - 1;
            return (
              <div key={a} className="card-tactile p-5 flex flex-col items-center text-center" style={{ borderColor: area.color + "55" }}>
                <ProgressRing progress={pct} color={area.color} size={72} />
                <p className="font-display font-bold ink-text mt-2">{area.emoji} {area.title}</p>
                <p className="text-xs muted-ink font-semibold">{completedLevels} niveles completados</p>
                <p className="text-xs muted-ink font-semibold">{rec?.completed_activities_total || 0} actividades</p>
              </div>
            );
          })}
        </div>

        {/* Evaluaciones del docente */}
        <h2 className="font-display font-bold text-lg ink-text mb-3 flex items-center gap-2">
          <Phone className="w-5 h-5" /> Evaluaciones del docente
        </h2>
        {assessments.length === 0 ? (
          <div className="card-tactile p-6 text-center mb-6">
            <Robot mood="happy" size={80} />
            <p className="muted-ink font-semibold mt-2">Aún no hay evaluaciones enviadas por el docente.</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {assessments.map((ev) => (
              <div key={ev.id} className="card-tactile p-4" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-sm ink-text">{AREAS[ev.area]?.title || ev.area}</span>
                  <span className="text-xs muted-ink font-semibold">{ev.date ? new Date(ev.date).toLocaleDateString("es-SV") : ""}</span>
                </div>
                <p className="text-sm ink-text font-semibold">{ev.result}</p>
                {ev.observations && <p className="text-xs muted-ink mt-1">{ev.observations}</p>}
                <p className="text-xs muted-ink mt-1">Docente: {ev.teacher_name}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs muted-ink text-center">La conexión con docentes permite consultar el progreso individual y grupal, evaluar y enviar resultados al encargado.</p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs muted-ink font-semibold">{label}</p>
      <p className="font-bold ink-text">{value || "—"}</p>
    </div>
  );
}