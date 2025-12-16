import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthApi } from "@/api/auth.api";
import { useAuth } from "@/store/auth.store";


export default function Login() {
  const navigate = useNavigate();
  const { setTokens, loadMe } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(null);
    setLoading(true);

    try {
      const { data } = await AuthApi.login({ email, password });

      // Guarda tokens en el store (y por ende en localStorage)
      setTokens(data.accessToken, data.refreshToken);
      await loadMe();

const { user } = useAuth.getState();

if (user?.roles.includes("ADMINISTRADOR")) {
  navigate("/admin");
} else {
  navigate("/");
}

    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string }
      | string
      | undefined;

    const msg =
      typeof data === "string"
        ? data
        : data?.message;

    setShowError(
      msg ||
        "No se pudo iniciar sesión. Revisa tus datos e inténtalo nuevamente."
    );
  } else {
    setShowError("Ocurrió un error inesperado. Inténtalo otra vez.");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-72px)] flex items-center justify-center px-4 py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-stretch">
        {/* Columna izquierda - hero / branding */}
        <div className="hidden md:flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-[#2b0508] via-neutral-950 to-black p-7">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Bienvenido a
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Red<span className="text-[#D32F2F]">Thread</span>
            </h1>
            <p className="mt-3 text-sm text-white/70 max-w-sm">
              Inicia sesión para acceder a tu historial de pedidos, guardar tu
              carrito y seguir tus prendas favoritas.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-xs text-white/65">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-xl border border-red-700/70 bg-red-900/30 flex items-center justify-center text-[11px] font-semibold">
                RT
              </div>
              <p className="leading-snug">
                Una sola cuenta para gestionar tus compras, direcciones y
                preferencias de estilo.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-xl border border-neutral-700/80 bg-neutral-900 flex items-center justify-center text-[11px]">
                ★
              </div>
              <p className="leading-snug">
                Recibe novedades sobre lanzamientos, colecciones limitadas y
                ofertas especiales.
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha - formulario */}
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/90 p-6 sm:p-7 md:p-8 shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">
              Acceso
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60">
              Ingresa con tu correo y contraseña para continuar.
            </p>
          </div>

          {showError && (
            <div className="mb-4 rounded-lg border border-red-700/70 bg-red-950/70 px-3.5 py-2.5 text-xs text-red-100">
              {showError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-white/80"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md bg-neutral-950 border border-neutral-700 px-3 py-2.5 text-sm text-white/90 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                placeholder="tu@correo.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-white/80"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-neutral-950 border border-neutral-700 px-3 py-2.5 text-sm text-white/90 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                placeholder="••••••••"
              />
            </div>

            {/* Recordar / Olvido */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <label className="inline-flex items-center gap-2 text-xs text.white/65">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border border-neutral-600 bg-neutral-950 text-[#D32F2F] focus:ring-[#D32F2F]"
                />
                <span className="text-white/65">Recordar este dispositivo</span>
              </label>

              <button
                type="button"
                className="text-xs text-[#f08f8f] hover:text-[#ffb3b3] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#D32F2F] px-4 py-2.5 text-sm font-medium text.white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Iniciando sesión..." : "Entrar"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-[11px] text-white/40">
            <div className="h-px flex-1 bg-neutral-800" />
            <span>o</span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

          {/* Registro */}
          <div className="text-center text-xs text-white/60">
            ¿Aún no tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-[#f08f8f] hover:text-[#ffb3b3] transition-colors"
            >
              Crear una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
