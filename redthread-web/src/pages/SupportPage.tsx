export default function SupportPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Ayuda
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">Soporte</h1>
        <p className="max-w-2xl text-sm text-white/65">
          Estamos aquí para ayudarte con cualquier duda relacionada con tus
          pedidos, tu cuenta o el funcionamiento de la tienda.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* FAQs */}
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-8 space-y-5">
          <h2 className="text-sm font-semibold text-white/85">
            Preguntas frecuentes
          </h2>

          <div>
            <p className="text-sm font-medium text-white/85">
              ¿Dónde veo el estado de mi pedido?
            </p>
            <p className="mt-1 text-sm text-white/70">
              Puedes revisar el estado actualizado en la sección{" "}
              <span className="font-semibold">Seguimiento de pedido</span> con
              el número que recibiste por correo.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-white/85">
              ¿Puedo cambiar una talla o producto?
            </p>
            <p className="mt-1 text-sm text-white/70">
              Sí. Revisa los detalles en{" "}
              <span className="font-semibold">
                Cambios y devoluciones
              </span>{" "}
              y contáctanos si necesitas orientación.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-white/85">
              Olvidé mi contraseña, ¿qué hago?
            </p>
            <p className="mt-1 text-sm text-white/70">
              En la pantalla de inicio de sesión encontrarás la opción para
              recuperar tu contraseña mediante correo electrónico.
            </p>
          </div>
        </div>

        {/* Contacto */}
        <aside className="rounded-2xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900/85 to-black p-6 md:p-7 space-y-4">
          <h3 className="text-sm font-semibold text-white/85">
            Canales de contacto
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              Correo soporte:{" "}
              <span className="font-mono">soporte@redthread.cl</span>
            </li>
            <li>Horario de atención: lunes a viernes, 9:00 a 18:00 hrs.</li>
          </ul>
          <p className="text-xs text-white/55">
            Si tu consulta está relacionada con un pedido, incluye siempre el
            número de pedido para agilizar la gestión.
          </p>
        </aside>
      </section>
    </div>
  );
}
