import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthApi } from "@/api/auth.api";
import { useAuth } from "@/store/auth.store";
import axios from "axios";

export default function Login() {
  const nav = useNavigate();
  const { setTokens, loadMe } = useAuth();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
  setLoading(true);
  setErr("");
  const { data } = await AuthApi.login({ email, password });

  setTokens(data.accessToken, data.refreshToken);

localStorage.setItem("rt.access", data.accessToken ?? "");
localStorage.setItem("rt.refresh", data.refreshToken ?? "");


  await loadMe();
  const user = useAuth.getState().user;

  if (user?.roles?.includes("ADMIN")) nav("/admin");
  else nav("/");
} catch (err) {
  if (axios.isAxiosError(err)) {
    setErr(err.response?.data?.message ?? "Credenciales inválidas");
  } else {
    setErr("Error desconocido");
  }
} finally {
  setLoading(false);
}

};

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="space-y-4 card p-6">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
        <p className="text-sm text-white/70">¿No tienes cuenta? <Link to="/register" className="underline">Regístrate</Link></p>
      </form>
    </div>
  );
}
