import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthApi } from "@/api/auth.api";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");

      // ✅ Enviar el campo correcto: fullName
      await AuthApi.register({ fullName: name, email, password });

      setOk(true);
      setTimeout(() => nav("/login"), 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErr(error.response?.data?.message ?? "Error al registrarse");
      } else {
        setErr("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="bg-[#1E1E1E] p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Crear cuenta
        </h1>

        {err && <p className="text-red-500 text-sm mb-3">{err}</p>}
        {ok && <p className="text-green-500 text-sm mb-3">Cuenta creada ✅</p>}

        <label className="block mb-3">
          <span className="text-sm text-gray-400">Nombre completo</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 p-2 bg-[#2A2A2A] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm text-gray-400">Correo electrónico</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 bg-[#2A2A2A] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-400">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 bg-[#2A2A2A] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-medium"
        >
          {loading ? "Cargando..." : "Registrarse"}
        </button>

        <p className="text-center text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
