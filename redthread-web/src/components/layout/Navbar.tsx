import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth.store";
import { useCart } from "@/store/cart.store";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lines } = useCart();

  const isLogged = !!user;
  const isAdmin = user?.roles?.includes("ADMINISTRADOR") ?? false;
  const location = useLocation();
  const navigate = useNavigate();

  const totalQty = lines.reduce((acc, l) => acc + l.qty, 0);
  const cartBadge = totalQty > 9 ? "+9" : totalQty.toString();

  const handleLogout = () => {
    logout();
    if (location.pathname.startsWith("/admin")) {
      navigate("/");
    }
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[rgba(12,12,12,0.85)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        {/* Brand */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          <span className="text-white">Red</span>
          <span className="text-[#D32F2F]">Thread</span>
        </Link>

        {/* Links principales */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link
            to="/catalog"
            className={`transition-colors ${
              isActive("/catalog")
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Tienda
          </Link>
        </nav>

        {/* Buscador (decorativo) */}
        <div className="ml-auto hidden lg:block">
          <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-950/80 px-3 py-1.5 text-sm text-white/80 max-w-xs">
            <svg
              className="mr-2 h-4 w-4 text-white/50"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="w-full bg-transparent text-xs text-white/80 placeholder:text-white/40 focus:outline-none"
              placeholder="Buscar productos..."
            />
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Admin */}
          {isLogged && isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center rounded-md border border-amber-500/60 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
            >
              Panel administrador
            </Link>
          )}

          {/* Carrito con badge */}
          <Link
            to="/cart"
            className="relative inline-flex items-center rounded-md border border-neutral-700 bg-neutral-950/80 px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-neutral-900 transition-colors"
          >
            <span className="relative mr-2 inline-flex">
              <svg
                className="h-4 w-4 text-white/80"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="9" cy="21" r="1" stroke="currentColor" />
                <circle cx="20" cy="21" r="1" stroke="currentColor" />
                <path
                  d="M1 4h3l2.4 11.5a1 1 0 0 0 1 .8h12.7a1 1 0 0 0 1-.8L22 8H6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {totalQty > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D32F2F] px-1 text-[10px] font-semibold text-white">
                  {cartBadge}
                </span>
              )}
            </span>
            <span>Carrito</span>
          </Link>

          {/* Auth */}
          {isLogged ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center rounded-md border border-neutral-700 bg-neutral-950/80 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-neutral-900 transition-colors"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center rounded-md bg-[#D32F2F] px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
