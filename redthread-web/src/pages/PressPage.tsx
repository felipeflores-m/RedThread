export default function PressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Empresa
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">Prensa</h1>
        <p className="max-w-2xl text-sm text-white/65">
          Si necesitas información sobre RedThread para una nota, entrevista o
          colaboración, este es el lugar indicado.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-8">
          <h2 className="text-lg font-semibold">Kit de prensa</h2>
          <p className="text-sm text-white/70">
            Ponemos a disposición material de marca para usos autorizados por
            medios y creadores de contenido.
          </p>
          <ul className="list-disc pl-5 text-sm text-white/72 space-y-1">
            <li>Logo oficial para fondo claro y oscuro.</li>
            <li>Paleta de colores y usos recomendados.</li>
            <li>Capturas de pantalla de la tienda y elementos clave.</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/85 to-black p-6 md:p-8">
          <h3 className="text-sm font-semibold text-white/85">
            Contacto de prensa
          </h3>
          <p className="text-sm text-white/70">
            Para solicitudes de información, entrevistas o colaboraciones:
          </p>
          <div className="rounded-xl border border-neutral-700/80 bg-neutral-900/80 px-4 py-3 text-sm font-mono text-white/90">
            prensa@redthread.cl
          </div>
          <p className="text-xs text-white/55">
            Intentamos responder todas las consultas de prensa en un plazo
            máximo de 2 a 3 días hábiles.
          </p>
        </div>
      </section>
    </div>
  );
}
