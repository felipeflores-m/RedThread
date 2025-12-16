import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/auth.store";
import { useEffect, useState, type JSX } from "react";

type Props = {
  children: JSX.Element;
};

export default function AdminRoute({ children }: Props) {
  const { user, token, loadMe } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Si hay token pero no user, cargamos /me
      if (token && !user) {
        await loadMe();
      }
      setLoading(false);
    };
    init();
  }, [token, user, loadMe]);

  if (loading) return null; // o spinner si quieres

  // ❌ No logeado
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logeado pero no ADMIN
  if (!user.roles?.includes("ADMINISTRADOR")) {
    return <Navigate to="/" replace />;
  }

  // ✅ Todo OK
  return children;
}
