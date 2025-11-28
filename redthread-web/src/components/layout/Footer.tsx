import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/80 bg-[rgba(12,12,12,0.6)]">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-4">
        {/* Marca */}
        <div>
          <div className="text-lg font-semibold">
            <span className="text-white">Red</span>
            <span className="text-[#D32F2F]">Thread</span>
          </div>
          <p className="mt-3 text-sm text-white/65">
            Moda urbana moderna. Envíos a todo el país.
          </p>
        </div>

        {/* Empresa */}
        <div>
          <p className="text-sm font-medium mb-3 text-white/80">Empresa</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/sobre-nosotros" className="hover:text-white">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/trabaja-con-nosotros" className="hover:text-white">
                Trabaja con nosotros
              </Link>
            </li>
            <li>
              <Link to="/prensa" className="hover:text-white">
                Prensa
              </Link>
            </li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <p className="text-sm font-medium mb-3 text-white/80">Ayuda</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link
                to="/seguimiento-de-pedido"
                className="hover:text-white"
              >
                Seguimiento de pedido
              </Link>
            </li>
            <li>
              <Link
                to="/cambios-y-devoluciones"
                className="hover:text-white"
              >
                Cambios y devoluciones
              </Link>
            </li>
            <li>
              <Link to="/soporte" className="hover:text-white">
                Soporte
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-sm font-medium mb-3 text-white/80">Legal</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link
                to="/terminos-y-condiciones"
                className="hover:text-white"
              >
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link
                to="/politica-de-privacidad"
                className="hover:text-white"
              >
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800/80">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/50">
          © {year} RedThread. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
