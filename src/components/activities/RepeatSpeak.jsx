import React, { useState, useRef } from "react";
import { speak, startMicMonitor } from "@/lib/speech";

// Actividad: escuchar y repetir / hablar (con detección de micrófono).
export default function RepeatSpeak({ activity, onComplete }) {
  const [listening, setListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [done, setDone] = useState(false);
  const cleanupRef = useRef(null);
  const successTimer = useRef(null);

  const handleListen = () => {
    speak(activity.speak || activity.prompt);
  };

  const handleSpeak = async () => {
    if (listening || done) return;
    setListening(true);
    setLevel(0);
    const cleanup = await startMicMonitor((lvl) => {
      setLevel(lvl);
      if (lvl > 28 && !successTimer.current) {
        successTimer.current = setTimeout(() => {
          setDone(true);
          setListening(false);
          cleanupRef.current?.();
          setTimeout(onComplete, 600);
        }, 900);
      }
    });
    cleanupRef.current = cleanup;
    if (!cleanup) {
      // Sin micrófono: permitir completar con un toque
      setListening(false);
      setDone(true);
      setTimeout(onComplete, 600);
    }
  };

  React.useEffect(() => () => {
    cleanupRef.current?.();
    clearTimeout(successTimer.current);
  }, []);

  const bars = Array.from({ length: 7 });

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {activity.emoji && <div className="text-7xl">{activity.emoji}</div>}
      <div className="text-center">
        <p className="font-display font-bold text-3xl ink-text">{activity.prompt}</p>
      </div>
      <button onClick={handleListen} className="pill-btn bg-secondary ink-text px-6 h-12 text-base flex items-center gap-2">
        🔊 Escuchar
      </button>

      {/* Indicador de onda de audio */}
      <div className="flex items-end justify-center gap-1.5 h-16">
        {bars.map((_, i) => {
          const active = listening && level > 10;
          const h = active ? 20 + Math.min(48, level * 1.6) * (0.5 + Math.sin(i + Date.now() / 100) * 0.5) : 8;
          return (
            <div
              key={i}
              className="w-3 rounded-full transition-all"
              style={{
                height: done ? 48 : h,
                background: done ? "#10B981" : active ? "#8E86FF" : "rgba(142,134,255,0.3)",
              }}
            />
          );
        })}
      </div>

      <button
        onClick={handleSpeak}
        disabled={done}
        className={`pill-btn text-white px-10 h-20 text-lg flex items-center gap-3 ${done ? "bg-green-500" : "brand-gradient"}`}
      >
        {done ? "✓ ¡Muy bien!" : listening ? "🎙️ Habla..." : "🎙️ Hablar"}
      </button>
      {!done && <p className="text-sm muted-ink font-semibold text-center max-w-xs">Toca el botón y repite lo que escuchaste</p>}
    </div>
  );
}