import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const LOGO_URL = "https://media.base44.com/images/public/6abf35847e6acbbf7e2cc2d7/384ee9e05_teknyfy.png";

export default function Welcome() {
  return (
    <div className="min-h-screen surface-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #00F2E5, transparent)" }} />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #4F46E5, transparent)" }} />

      <div className="relative flex flex-col items-center text-center max-w-lg">
        <div
          className="bg-white rounded-[2rem] border-[3px] p-6 sm:p-8 mb-8 shadow-lg"
          style={{ borderColor: "var(--hairline)", boxShadow: "0 16px 40px rgba(79, 70, 229, 0.14)" }}
        >
          <Image
            src={LOGO_URL}
            alt="TEKNIFY"
            fittingType="fit"
            className="w-56 h-44 sm:w-72 sm:h-56 object-contain"
          />
        </div>
        <h1 className="font-display font-bold text-5xl sm:text-6xl leading-tight" style={{ color: "#4F46E5" }}>
          ¡Bienvenidos!
        </h1>
        <p className="text-lg sm:text-xl ink-text font-bold mt-3">¡Hola! Vamos a aprender juntos</p>
        <p className="muted-ink font-semibold mt-2 max-w-sm">
          Aprendo a hablar, leer y escribir jugando, con la guía de mi robot amigable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none sm:w-auto">
          <Link
            to="/login"
            className="pill-btn text-white px-10 h-16 text-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #007AFF 0%, #4F46E5 100%)" }}
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="pill-btn px-10 h-16 text-xl flex items-center justify-center bg-white"
            style={{ border: "3px solid #007AFF", color: "#007AFF", boxShadow: "0 8px 20px rgba(0, 122, 255, 0.12)" }}
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}