import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { 
  Sparkles, 
  BookOpen, 
  Mic, 
  Pencil, 
  Award, 
  LogOut, 
  User, 
  Play,
  Flame,
  Star
} from "lucide-react";

// Tu robot guardado en src/assets/robot.png
import robotImg from "@/assets/robot.png";

export default function Home() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem("user");
    if (authUser) {
      setUser(authUser);
    } else if (localData) {
      try {
        setUser(JSON.parse(localData));
      } catch (e) {
        setUser(null);
      }
    }
  }, [authUser]);

  const areas = [
    {
      id: "habla",
      title: "Expresión Oral",
      desc: "Ejercicios de pronunciación y articulación",
      icon: Mic,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      progress: 65,
    },
    {
      id: "lectura",
      title: "Comprensión Lectora",
      desc: "Lectura interactiva y cuentos guiados",
      icon: BookOpen,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      progress: 40,
    },
    {
      id: "escritura",
      title: "Trazos y Escritura",
      desc: "Práctica de grafomotricidad y letras",
      icon: Pencil,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      progress: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      {/* Barra superior */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={robotImg} 
              alt="Robot Mi Primera Voz" 
              className="w-10 h-10 object-contain" 
            />
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Mi Primera Voz
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700">
              <User className="w-4 h-4 text-purple-600" />
              <span>{user?.correo || "Estudiante"}</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold ml-1 uppercase">
                {user?.rol || "Estudiante"}
              </span>
            </div>

            <button
              onClick={() => {
                if (logout) logout();
                else {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }
              }}
              title="Cerrar Sesión"
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-8">
        {/* Banner de Bienvenida */}
        <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>¡Bienvenido de nuevo!</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              ¡Hola, {user?.correo?.split("@")[0] || "estudiante"}! 👋
            </h1>
            <p className="text-purple-100 font-medium text-sm sm:text-base mb-6">
              Continúa practicando tus ejercicios de lenguaje y lectura para ganar más medallas hoy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate("/activity")}
                className="bg-white text-purple-700 hover:bg-purple-50 font-bold px-6 py-3 rounded-2xl shadow-sm flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-purple-700" />
                Continuar lección
              </button>
            </div>
          </div>

          {/* Contenedor del Robot Flotante */}
          <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
            <img 
              src={robotImg} 
              alt="Robot Mi Primera Voz" 
              className="w-36 h-36 sm:w-48 sm:h-48 object-contain filter drop-shadow-lg animate-bounce" 
              style={{ animationDuration: "3s" }}
            />
          </div>
        </section>

        {/* Racha y Puntos */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Racha Activa</p>
              <p className="text-xl font-extrabold text-slate-800">5 Días seguidos</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl">
              <Star className="w-6 h-6 fill-yellow-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Puntos XP</p>
              <p className="text-xl font-extrabold text-slate-800">1,240 XP</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Logros</p>
              <p className="text-xl font-extrabold text-slate-800">8 Medallas</p>
            </div>
          </div>
        </section>

        {/* Módulos */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Áreas de Aprendizaje
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3.5 rounded-2xl ${area.bgColor} ${area.textColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {area.progress}% completado
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-1">{area.title}</h3>
                    <p className="text-slate-500 text-sm mb-6">{area.desc}</p>
                  </div>

                  <div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full bg-gradient-to-r ${area.color} rounded-full`}
                        style={{ width: `${area.progress}%` }}
                      ></div>
                    </div>

                    <button
                      onClick={() => navigate(`/activity?area=${area.id}`)}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition-colors"
                    >
                      Empezar Práctica
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}