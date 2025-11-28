export default function CareersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Empresa
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Trabaja con <span className="text-[#D32F2F]">nosotros</span>
        </h1>
        <p className="max-w-2xl text-sm text-white/65">
          Buscamos personas que compartan nuestra pasión por la moda urbana, la
          tecnología y la experiencia de cliente.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Texto principal */}
        <div className="space-y-5 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-8">
          <h2 className="text-lg font-semibold">Perfiles que buscamos</h2>
          <p className="text-sm text-white/70">
            Creemos en los equipos pequeños, multidisciplinarios y con alto
            impacto. Si te gusta aprender, aportar ideas y ver resultados
            concretos, probablemente encajes bien en RedThread.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-white/72">
            <li>Personas responsables y con buena comunicación.</li>
            <li>Interés por la moda, el e-commerce y los clientes.</li>
            <li>Ganas de trabajar con herramientas digitales modernas.</li>
          </ul>
        </div>

        {/* Card de postulación */}
        <aside className="space-y-4 rounded-2xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900/85 to-black p-6 md:p-7">
          <h3 className="text-sm font-semibold text-white/85">
            Envía tu postulación
          </h3>
          <p className="text-sm text-white/70">
            Cuéntanos quién eres, qué te motiva y en qué área te gustaría
            aportar. Adjunta tu CV y, si tienes, enlaces a proyectos o redes
            profesionales.
          </p>
          <div className="rounded-xl border border-neutral-700/80 bg-neutral-900/80 px-4 py-3 text-sm font-mono text-white/90">
            talento@redthread.cl
          </div>
          <p className="text-xs text-white/55">
            Asunto sugerido: <span className="font-mono">
              Postulación – [Área de interés]
            </span>
          </p>
        </aside>
      </section>
    </div>
  );
}
