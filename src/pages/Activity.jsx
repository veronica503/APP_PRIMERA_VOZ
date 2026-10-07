import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Sparkles, 
  Volume2, 
  Mic, 
  CheckCircle2, 
  Star, 
  Play, 
  Lock,
  Trophy,
  RotateCcw
} from "lucide-react";

export default function Activity() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const currentArea = searchParams.get("area") || "habla";
  
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stars, setStars] = useState(0);

  // Niveles y ejercicios para las distintas áreas
  const levelsData = {
    habla: {
      title: "Expresión Oral",
      icon: Mic,
      levels: [
        { id: 1, title: "Nivel 1: Las Vocales", word: "A - E - I - O - U", target: "Pronuncia las vocales en voz alta", unlocked: true },
        { id: 2, title: "Nivel 2: Palabras Básicas", word: "Mamá, Papá, Sol", target: "Repite cada palabra con claridad", unlocked: true },
        { id: 3, title: "Nivel 3: Frases Cortas", word: "El sol es amarillo", target: "Articula la frase completa", unlocked: false },
      ]
    },
    lectura: {
      title: "Comprensión Lectora",
      icon: Volume2,
      levels: [
        { id: 1, title: "Nivel 1: Reconocer Letras", word: "M - P - L - S", target: "Identifica el sonido de cada letra", unlocked: true },
        { id: 2, title: "Nivel 2: Sílabas Simples", word: "Ma - Me - Mi - Mo - Mu", target: "Lee en voz alta las sílabas", unlocked: true },
        { id: 3, title: "Nivel 3: Cuentos Cortos", word: "El gato toma leche", target: "Lee la oración y responde la pregunta", unlocked: false },
      ]
    },
    escritura: {
      title: "Trazos y Escritura",
      icon: Sparkles,
      levels: [
        { id: 1, title: "Nivel 1: Líneas e Íconos", word: "Trazos Rectos", target: "Sigue las líneas punteadas", unlocked: true },
        { id: 2, title: "Nivel 2: Formas Geométricas", word: "Círculo y Triángulo", target: "Completa el trazo de la figura", unlocked: true },
        { id: 3, title: "Nivel 3: Primeras Letras", word: "Letra A y Letra M", target: "Escribe la letra siguiendo las flechas", unlocked: false },
      ]
    }
  };

  const activeAreaData = levelsData[currentArea] || levelsData["habla"];
  const currentExercise = activeAreaData.levels.find(l => l.id === selectedLevel) || activeAreaData.levels[0];

  const handleSimulatePractice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCompleted(true);
      setStars(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      {/* Encabezado */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/inicio")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Inicio</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-slate-800">{activeAreaData.title}</span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        
        {/* Selector de Niveles */}
        <section className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Selecciona tu Nivel:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeAreaData.levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => {
                  if (lvl.unlocked) {
                    setSelectedLevel(lvl.id);
                    setCompleted(false);
                    setStars(0);
                  }
                }}
                disabled={!lvl.unlocked}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedLevel === lvl.id
                    ? "border-purple-600 bg-purple-50 ring-2 ring-purple-500/20"
                    : lvl.unlocked
                    ? "border-slate-200 hover:border-purple-300 bg-white"
                    : "border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Nivel {lvl.id}
                  </span>
                  {!lvl.unlocked ? (
                    <Lock className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Star className={`w-4 h-4 ${selectedLevel === lvl.id ? "text-amber-500 fill-amber-400" : "text-slate-300"}`} />
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{lvl.title}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Panel de la Lección / Ejercicio Activo */}
        <section className="bg-gradient-to-b from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg text-center relative overflow-hidden space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{currentExercise.title}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-wide text-amber-300">
              "{currentExercise.word}"
            </h1>
            <p className="text-purple-100 font-medium text-sm sm:text-base">
              {currentExercise.target}
            </p>
          </div>

          {/* Área de Acción / Botón de Grabación o Práctica */}
          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            {!completed ? (
              <button
                onClick={handleSimulatePractice}
                disabled={isRecording}
                className={`px-8 py-4 rounded-full font-extrabold text-lg shadow-lg flex items-center gap-3 transition-all transform active:scale-95 ${
                  isRecording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white text-purple-700 hover:bg-purple-50"
                }`}
              >
                {isRecording ? (
                  <>
                    <Mic className="w-6 h-6 animate-bounce" />
                    <span>Escuchando...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 fill-purple-700" />
                    <span>Iniciar Ejercicio</span>
                  </>
                )}
              </button>
            ) : (
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4 max-w-md w-full animate-fade-in">
                <div className="flex items-center justify-center gap-1 text-amber-300">
                  <Star className="w-8 h-8 fill-amber-400" />
                  <Star className="w-8 h-8 fill-amber-400" />
                  <Star className="w-8 h-8 fill-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Excelente Trabajo! 🎉</h3>
                <p className="text-sm text-purple-100">Has completado esta práctica con éxito.</p>
                
                <button
                  onClick={() => setCompleted(false)}
                  className="bg-white text-purple-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-purple-50 inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetir Nivel</span>
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}