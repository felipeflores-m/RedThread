export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 bg-[rgba(12,12,12,0.6)]">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold"><span className="text-white">Red</span><span className="text-[#D32F2F]">Thread</span></div>
          <p className="mt-3 text-sm text-white/65">Moda urbana moderna. Envíos a todo el país.</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-3 text-white/80">Empresa</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
            <li><a href="#">Prensa</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium mb-3 text-white/80">Ayuda</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#">Seguimiento de pedido</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
            <li><a href="#">Soporte</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium mb-3 text-white/80">Legal</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800/80">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/60">© {new Date().getFullYear()} RedThread. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
