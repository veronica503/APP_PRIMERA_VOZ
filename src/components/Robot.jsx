import React from "react";

// Robot guía estilo "dibujo a mano con crayones": peluche cosido naranja,
// contorno de tinta azul marina, botones en mejillas y vientre, puntadas visibles.
// mood: "happy" | "celebrate" | "explain" | "wave"
const NAVY = "#1D2350";
const ORANGE = "#FFA630";
const PINK = "#E88E8B";
const GREEN = "#85B876";
const RED = "#CC5D54";

function Star({ x, y, r = 14, fill = NAVY, opacity = 1 }) {
  const pts = [
    [0, -r], [r * 0.24, -r * 0.32], [r * 0.95, -r * 0.31],
    [r * 0.38, r * 0.12], [r * 0.59, r * 0.81], [0, r * 0.4],
    [-r * 0.59, r * 0.81], [-r * 0.38, r * 0.12], [-r * 0.95, -r * 0.31],
    [-r * 0.24, -r * 0.32],
  ].map(([px, py]) => `${px},${py}`).join(" ");
  return <polygon points={pts} fill={fill} transform={`translate(${x} ${y})`} opacity={opacity} />;
}

function Button({ cx, cy, r, fill, xPattern = false }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={NAVY} strokeWidth="3" />
      {xPattern ? (
        <>
          <line x1={cx - r * 0.45} y1={cy - r * 0.45} x2={cx + r * 0.45} y2={cy + r * 0.45} stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
          <line x1={cx + r * 0.45} y1={cy - r * 0.45} x2={cx - r * 0.45} y2={cy + r * 0.45} stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={cx - r * 0.3} cy={cy} r={1.8} fill={NAVY} />
          <circle cx={cx + r * 0.3} cy={cy} r={1.8} fill={NAVY} />
        </>
      )}
    </g>
  );
}

export default function Robot({ mood = "happy", size = 160, className = "" }) {
  const celebrating = mood === "celebrate";
  const waving = mood === "wave";
  const filterId = `crayon-${React.useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={size * 1.2}
      className={className}
      role="img"
      aria-label="Robot guía de Mi Primera Voz"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {/* Sombra */}
        <ellipse cx="100" cy="234" rx="52" ry="5" fill={NAVY} opacity="0.08" />

        {/* Decoraciones de crayón */}
        <Star x={24} y={52} r={13} />
        <Star x={178} y={44} r={10} />
        <circle cx="10" cy="110" r="3" fill={NAVY} opacity="0.7" />
        <circle cx="192" cy="122" r="3" fill={NAVY} opacity="0.7" />
        <circle cx="38" cy="26" r="2.5" fill={NAVY} opacity="0.6" />
        <circle cx="170" cy="208" r="2.5" fill={NAVY} opacity="0.6" />
        <circle cx="12" cy="178" r="6" fill="none" stroke={NAVY} strokeWidth="2.5" opacity="0.7" />
        <circle cx="190" cy="168" r="5" fill="none" stroke={NAVY} strokeWidth="2.5" opacity="0.7" />
        {celebrating && (
          <>
            <Star x={28} y={184} r={9} fill={GREEN} />
            <Star x={174} y={80} r={8} fill={PINK} />
            <Star x={160} y={220} r={7} fill={RED} />
            <circle cx="16" cy="70" r="3.5" fill={RED} opacity="0.8" />
          </>
        )}

        {/* Antena */}
        <line x1="100" y1="52" x2="100" y2="32" stroke={NAVY} strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="100" cy="24" r="9" fill={ORANGE} stroke={NAVY} strokeWidth="4">
          {celebrating && <animate attributeName="r" values="9;11.5;9" dur="0.6s" repeatCount="indefinite" />}
        </circle>

        {/* Brazo izquierdo colgando */}
        <path d="M52 160 L44 196" stroke={NAVY} strokeWidth="21" strokeLinecap="round" />
        <path d="M52 160 L44 196" stroke={ORANGE} strokeWidth="13" strokeLinecap="round" />
        <circle cx="43" cy="202" r="11" fill={ORANGE} stroke={NAVY} strokeWidth="4.5" />

        {/* Brazo derecho saludando */}
        <g>
          {waving && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 150 160;16 150 160;-5 150 160;0 150 160"
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
          <path d="M150 160 L168 114" stroke={NAVY} strokeWidth="21" strokeLinecap="round" />
          <path d="M150 160 L168 114" stroke={ORANGE} strokeWidth="13" strokeLinecap="round" />
          <circle cx="172" cy="106" r="12" fill={ORANGE} stroke={NAVY} strokeWidth="4.5" />
          <circle cx="164" cy="98" r="4" fill={ORANGE} stroke={NAVY} strokeWidth="3" />
        </g>

        {/* Cabeza */}
        <rect x="44" y="52" width="112" height="84" rx="26" fill={ORANGE} stroke={NAVY} strokeWidth="5" />
        <rect x="51" y="59" width="98" height="70" rx="20" fill="none" stroke={NAVY} strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" opacity="0.55" />

        {/* Ojos */}
        {celebrating ? (
          <>
            <path d="M68 94 Q76 86 84 94" stroke={NAVY} strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M116 94 Q124 86 132 94" stroke={NAVY} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="76" cy="92" rx="6" ry="8.5" fill={NAVY} />
            <ellipse cx="124" cy="92" rx="6" ry="8.5" fill={NAVY} />
            <circle cx="78" cy="89" r="2" fill="#FFFFFF" />
            <circle cx="126" cy="89" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Boca */}
        {celebrating ? (
          <>
            <path d="M80 110 Q100 140 120 110 Q100 116 80 110 Z" fill={NAVY} />
            <ellipse cx="100" cy="122" rx="8" ry="4.5" fill={PINK} />
          </>
        ) : (
          <path d="M84 114 Q100 124 116 114" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round" />
        )}

        {/* Botones en las mejillas */}
        <Button cx={58} cy={112} r={7} fill={PINK} />
        <Button cx={142} cy={112} r={7} fill={GREEN} />

        {/* Cuello */}
        <rect x="92" y="132" width="16" height="12" rx="5" fill={ORANGE} stroke={NAVY} strokeWidth="3.5" />

        {/* Cuerpo */}
        <rect x="48" y="142" width="104" height="74" rx="24" fill={ORANGE} stroke={NAVY} strokeWidth="5" />
        <rect x="55" y="149" width="90" height="60" rx="19" fill="none" stroke={NAVY} strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" opacity="0.55" />

        {/* Vientre de peluche con botones */}
        <rect x="66" y="154" width="68" height="52" rx="18" fill="#FFFFFF" stroke={NAVY} strokeWidth="4" />
        <Button cx={84} cy={172} r={8} fill="#FFFFFF" xPattern />
        <Button cx={114} cy={186} r={9} fill={RED} />

        {/* Piernas */}
        <rect x="64" y="216" width="26" height="16" rx="8" fill={ORANGE} stroke={NAVY} strokeWidth="4.5" />
        <rect x="110" y="216" width="26" height="16" rx="8" fill={ORANGE} stroke={NAVY} strokeWidth="4.5" />
      </g>
    </svg>
  );
}