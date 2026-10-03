import React, { useRef, useState, useEffect } from "react";

// Actividad: trazar letras, formas o palabras con el dedo/cursor.
export default function TraceLetter({ activity, onComplete }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [strokeColor] = useState("#8E86FF");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeColor;
  }, [strokeColor]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasDrawn) setHasDrawn(true);
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const guide = activity.shape === "letra" || activity.shape === "palabra"
    ? activity.letter || activity.prompt
    : null;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden" style={{ border: "3px dashed var(--hairline)", background: "#FAFAFE" }}>
        {/* Guía */}
        {guide !== null ? (
          <span
            className="absolute inset-0 flex items-center justify-center font-display font-bold select-none"
            style={{ fontSize: activity.shape === "palabra" ? "2.5rem" : "8rem", color: "rgba(142,134,255,0.22)" }}
          >
            {guide}
          </span>
        ) : (
          <ShapeGuide shape={activity.shape} />
        )}
        <canvas
          ref={canvasRef}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          className="absolute inset-0 w-full h-full touch-none"
        />
      </div>
      <div className="flex gap-3">
        <button onClick={clear} className="pill-btn bg-secondary ink-text px-6 h-12 text-base">Borrar</button>
        {hasDrawn && (
          <button onClick={onComplete} className="pill-btn brand-gradient text-white px-8 h-12 text-base">¡Listo!</button>
        )}
      </div>
    </div>
  );
}

function ShapeGuide({ shape }) {
  const common = { stroke: "rgba(142,134,255,0.22)", strokeWidth: 10, fill: "none", strokeLinecap: "round" };
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-6">
      {shape === "linea" && <line x1="30" y1="100" x2="170" y2="100" {...common} />}
      {shape === "circulo" && <circle cx="100" cy="100" r="65" {...common} />}
      {shape === "zigzag" && <polyline points="30,140 70,60 100,140 130,60 170,140" {...common} />}
      {shape === "ondula" && <path d="M20,100 Q60,40 100,100 T180,100" {...common} />}
      {shape === "cruz" && <><line x1="100" y1="30" x2="100" y2="170" {...common} /><line x1="30" y1="100" x2="170" y2="100" {...common} /></>}
      {shape === "puntos" && [40,80,120,160].map((x, i) => [40,80,120,160].map((y, j) => <circle key={`${i}-${j}`} cx={x} cy={y} r="6" fill="rgba(142,134,255,0.22)" />))}
    </svg>
  );
}