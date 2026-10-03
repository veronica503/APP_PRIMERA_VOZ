import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AuthShell from "@/components/AuthShell";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";

const GRADES = ["Parvularia 4", "Parvularia 5", "Parvularia 6", "Primer grado"];
const GENDERS = ["Femenino", "Masculino", "Otro"];

export default function Register() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // Datos del estudiante
  const [nie, setNie] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("Parvularia 4");
  const [section, setSection] = useState("");

  // Datos del encargado
  const [gFirstName, setGFirstName] = useState("");
  const [gLastName, setGLastName] = useState("");
  const [gAge, setGAge] = useState("");
  const [gGender, setGGender] = useState("Femenino");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateStep1 = () => nie && firstName && lastName && grade;
  const validateStep2 = () =>
    gFirstName && gLastName && email && password && password === confirmPassword;

  const handleNext = (e) => {
    e.preventDefault();
    setError("");
    if (!validateStep1()) {
      setError("Completa todos los datos del estudiante");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      // Crear el perfil del estudiante
      try {
        await base44.entities.StudentProfile.create({
          nie,
          first_name: firstName,
          last_name: lastName,
          age: age ? Number(age) : null,
          grade,
          section,
          guardian_first_name: gFirstName,
          guardian_last_name: gLastName,
          guardian_age: gAge ? Number(gAge) : null,
          guardian_gender: gGender,
          guardian_email: email,
          avatar_emoji: "🦊",
        });
      } catch (e) {
        console.error("Profile creation failed", e);
      }
      window.location.href = (() => { const r = safeReturnTo(); return r !== "/" ? r : "/inicio"; })();
    } catch (err) {
      setError(err.message || "Código incorrecto");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast({ title: "Código enviado", description: "Revisa tu correo." });
    } catch (err) {
      setError(err.message || "No se pudo reenviar");
    }
  };

  if (showOtp) {
    return (
      <AuthShell robotMood="happy">
        <div className="text-center mb-5">
          <h2 className="font-display font-bold text-2xl ink-text">Verifica tu correo</h2>
          <p className="muted-ink font-semibold text-sm">Enviamos un código a {email}</p>
        </div>
        {error && <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 text-sm font-semibold text-center">{error}</div>}
        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus>
            <InputOTPGroup>
              {[0,1,2,3,4,5].map((i) => <InputOTPSlot key={i} index={i} />)}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <button
          onClick={handleVerify}
          disabled={loading || otpCode.length < 6}
          className="w-full h-14 pill-btn brand-gradient text-white text-lg flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verificando...</> : "Verificar"}
        </button>
        <p className="text-center text-sm muted-ink font-semibold mt-4">
          ¿No llegó? <button onClick={handleResend} className="font-bold brand-text hover:underline">Reenviar</button>
        </p>
      </AuthShell>
    );
  }

  const inputCls = "w-full h-14 rounded-2xl border-2 bg-white px-4 text-base font-semibold ink-text";
  const inputStyle = { borderColor: "var(--hairline)" };
  const labelCls = "font-display font-semibold ink-text text-sm";

  return (
    <AuthShell robotMood="wave" showRobot={step === 1}>
      <div className="flex items-center justify-center gap-2 mb-4">
        {[1, 2].map((s) => (
          <div key={s} className={`h-2.5 rounded-full transition-all ${step === s ? "w-10 brand-gradient" : "w-2.5 bg-secondary"}`} />
        ))}
      </div>
      <div className="text-center mb-4">
        <h2 className="font-display font-bold text-2xl ink-text">
          {step === 1 ? "Datos del estudiante" : "Datos del encargado"}
        </h2>
        <p className="muted-ink font-semibold text-sm">
          {step === 1 ? "Cuéntanos sobre ti" : "Un adulto supervisa tu cuenta"}
        </p>
      </div>
      {error && <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 text-sm font-semibold text-center">{error}</div>}

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className={labelCls}>NIE del estudiante</label>
            <input className={inputCls} style={inputStyle} value={nie} onChange={(e) => setNie(e.target.value)} placeholder="NIE" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelCls}>Nombres</label>
              <input className={inputCls} style={inputStyle} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombres" required />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Apellidos</label>
              <input className={inputCls} style={inputStyle} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellidos" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelCls}>Edad</label>
              <input type="number" min={3} max={8} className={inputCls} style={inputStyle} value={age} onChange={(e) => setAge(e.target.value)} placeholder="Edad" />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Sección</label>
              <input className={inputCls} style={inputStyle} value={section} onChange={(e) => setSection(e.target.value)} placeholder="Sección" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Grado</label>
            <select className={inputCls} style={inputStyle} value={grade} onChange={(e) => setGrade(e.target.value)}>
              {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full h-14 pill-btn brand-gradient text-white text-lg">Siguiente</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelCls}>Nombre</label>
              <input className={inputCls} style={inputStyle} value={gFirstName} onChange={(e) => setGFirstName(e.target.value)} placeholder="Nombre" required />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Apellido</label>
              <input className={inputCls} style={inputStyle} value={gLastName} onChange={(e) => setGLastName(e.target.value)} placeholder="Apellido" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelCls}>Edad</label>
              <input type="number" min={18} className={inputCls} style={inputStyle} value={gAge} onChange={(e) => setGAge(e.target.value)} placeholder="Edad" />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Género</label>
              <select className={inputCls} style={inputStyle} value={gGender} onChange={(e) => setGGender(e.target.value)}>
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Correo electrónico</label>
            <input type="email" className={inputCls} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelCls}>Contraseña</label>
              <input type="password" className={inputCls} style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Confirmar</label>
              <input type="password" className={inputCls} style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••" required />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="flex-1 h-14 pill-btn bg-secondary ink-text text-base">Atrás</button>
            <button type="submit" disabled={loading} className="flex-[2] h-14 pill-btn brand-gradient text-white text-lg flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creando...</> : "Crear cuenta"}
            </button>
          </div>
        </form>
      )}
      <p className="text-center text-sm muted-ink font-semibold mt-5">
        ¿Ya tienes cuenta? <Link to="/login" className="font-bold brand-text hover:underline">Iniciar sesión</Link>
      </p>
    </AuthShell>
  );
}