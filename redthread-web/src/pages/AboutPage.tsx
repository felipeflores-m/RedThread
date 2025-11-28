export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* Header */}
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Empresa
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Sobre <span className="text-[#D32F2F]">RedThread</span>
        </h1>
        <p className="max-w-2xl text-sm text-white/65">
          RedThread es una marca de moda urbana creada para quienes buscan
          prendas cómodas, versátiles y con estilo para el día a día.
        </p>
      </header>

      {/* Contenido */}
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Historia */}
        <div className="space-y-4 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-black p-6 md:p-8">
          <h2 className="text-lg font-semibold">Nuestra historia</h2>
          <p className="text-sm text-white/70">
            Nacimos con la idea de simplificar el armario: menos complicaciones
            y más prendas que realmente usas. Diseñamos colecciones que mezclan
            básicos de calidad con detalles urbanos y actuales.
          </p>
          <p className="text-sm text-white/70">
            Trabajamos con proveedores seleccionados y realizamos un control
            cuidadoso de materiales y terminaciones para que cada prenda se
            sienta bien desde el primer uso.
          </p>
          <p className="text-sm text-white/70">
            Nuestro objetivo es que cada compra sea una buena experiencia: una
            web clara, envíos rápidos y un equipo atento cuando necesites
            ayuda.
          </p>
        </div>

        {/* Datos rápidos */}
        <aside className="space-y-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-7">
          <h3 className="text-sm font-semibold text-white/85">
            Lo que nos define
          </h3>
          <dl className="space-y-3 text-sm text-white/70">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-white/60">Estilo</dt>
              <dd className="font-medium text-white/85">
                Moda urbana minimalista
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-white/60">Envíos</dt>
              <dd className="text-right">
                A todo el país con seguimiento<br />
                en línea de tu pedido
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-white/60">Atención</dt>
              <dd className="font-medium">Soporte dedicado al cliente</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-xs text-white/60">
            Diseñamos la experiencia digital para que comprar ropa sea tan
            sencillo como elegir qué quieres usar hoy.
          </div>
        </aside>
      </section>
    </div>
  );
}
