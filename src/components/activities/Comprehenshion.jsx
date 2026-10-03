import React, { useState } from "react";
import { speak } from "@/lib/speech";

// Actividad: comprensión de cuentos sencillos.
export default function Comprehension({ activity, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);

  React.useEffect(() => {
    const t = setTimeout(() => speak(activity.speak || `${activity.prompt}. ${activity.instruction}`), 400);
    return () => clearTimeout(t);
  }, [activity]);

  const handlePick = (i) => {
    if (i === activity.correct) {
      setSelected(i);
      setTimeout(onComplete, 500);
    } else {
      setWrong(i);
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="card-tactile p-5 w-full max-w-md text-center" style={{ borderColor: "rgba(16,185,129,0.3)" }}>
        <p className="text-xs font-bold uppercase tracking-wide muted-ink mb-2">Cuentito</p>
        <p className="text-lg font-semibold ink-text leading-relaxed">{activity.prompt}</p>
      </div>
      <p className="font-display font-bold text-xl ink-text text-center">{activity.instruction}</p>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {activity.options.map((opt, i) => {
          const isCorrect = selected === i;
          const isWrong = wrong === i;
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className={`h-14 rounded-2xl border-[3px] font-display font-bold text-lg transition-all ${
                isCorrect ? "bg-green-100 border-green-400 scale-105" : isWrong ? "bg-red-100 border-red-400 animate-pulse" : "bg-white hover:scale-105"
              }`}
              style={!isCorrect && !isWrong ? { borderColor: "var(--hairline)" } : {}}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}