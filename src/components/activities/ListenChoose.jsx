import React, { useState } from "react";
import { speak } from "@/lib/speech";

// Actividad: escuchar y elegir la opción correcta.
export default function ListenChoose({ activity, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);

  React.useEffect(() => {
    const t = setTimeout(() => speak(activity.speak || activity.prompt), 400);
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
    <div className="flex flex-col items-center gap-6 w-full">
      <button
        onClick={() => speak(activity.speak || activity.prompt)}
        className="pill-btn brand-gradient text-white px-6 h-14 text-base flex items-center gap-2"
      >
        🔊 Escuchar otra vez
      </button>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {activity.options.map((opt, i) => {
          const isCorrect = selected === i;
          const isWrong = wrong === i;
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className={`aspect-square rounded-3xl border-[3px] flex items-center justify-center text-5xl sm:text-6xl font-display font-bold transition-all ${
                isCorrect ? "bg-green-100 border-green-400 scale-105" : isWrong ? "bg-red-100 border-red-400 animate-pulse" : "bg-white hover:scale-105"
              }`}
              style={!isCorrect && !isWrong ? { borderColor: "var(--hairline)" } : {}}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && <p className="font-display font-bold text-2xl text-green-500">¡Muy bien!</p>}
    </div>
  );
}