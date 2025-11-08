import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth.store";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isLogged = !!user;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[rgba(12,12,12,0.7)] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        {/* Brand */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          <span className="text-white">Red</span>
          <span className="text-[#D32F2F]">Thread</span>
        </Link>

        {/* Nav principal */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
          <Link to="/catalog" className="hover:text-white">Tienda</Link>
          <a className="hover:text-white" href="#">Ofertas</a>
          <a className="hover:text-white" href="#">Ayuda</a>
        </nav>

        {/* Buscador */}
        <div className="ml-auto w-40 sm:w-64">
          <div className="relative">
            <input
              className="w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-2 pl-9 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
              placeholder="Buscar productos…"
            />
            <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Acciones */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/cart"
            className="inline-flex items-center rounded-md border border-neutral-800 px-3 py-2 text-sm text-white/90 hover:bg-neutral-900"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3h2l.4 2M7 13h9l3-7H6.4M7 13l-1.2 6H19M7 13l-2-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Carrito
          </Link>

          {/* Botón dinámico */}
          {isLogged ? (
            <button
              onClick={logout}
              className="btn btn-danger"
              style={{ backgroundColor: "#D32F2F", border: "none" }}
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-danger"
              style={{ backgroundColor: "#D32F2F", border: "none" }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
