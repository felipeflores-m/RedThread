export default function OrderTrackingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Ayuda
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Seguimiento de pedido
        </h1>
        <p className="max-w-2xl text-sm text-white/65">
          Consulta el estado de tu compra ingresando el número de pedido que
          recibiste por correo al confirmar la transacción.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Buscador */}
        <div className="rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-black p-6 md:p-8">
          <label className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">
            Número de pedido
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-md bg-neutral-950 border border-neutral-700 px-3 py-2.5 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
              placeholder="Ej: RT-2025-000123"
            />
            <button className="rounded-md bg-[#D32F2F] px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors">
              Consultar
            </button>
          </div>
          <p className="mt-3 text-xs text-white/50">
            También te iremos informando por correo cada vez que tu pedido cambie de estado.
          </p>
        </div>

        {/* Línea de tiempo de ejemplo */}
        <aside className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-7">
          <h2 className="text-sm font-semibold text-white/85 mb-4">
            Estados habituales
          </h2>

          <ol className="relative border-l border-neutral-700/70 pl-4 space-y-4 text-xs text-white/70">
            <li>
              <div className="absolute -left-[9px] mt-1 h-3 w-3 rounded-full bg-[#D32F2F]" />
              <p className="font-semibold text-white/85">Pedido confirmado</p>
              <p className="text-white/60">
                Tu pago fue validado y estamos preparando tu envío.
              </p>
            </li>
            <li>
              <div className="absolute -left-[9px] mt-[1.1rem] h-3 w-3 rounded-full bg-amber-500" />
              <p className="font-semibold text-white/85 mt-2">
                En preparación
              </p>
              <p className="text-white/60">
                Tu pedido se está embalando y asignando a la empresa de
                transporte.
              </p>
            </li>
            <li>
              <div className="absolute -left-[9px] mt-[2.2rem] h-3 w-3 rounded-full bg-emerald-500" />
              <p className="font-semibold text-white/85 mt-2">
                Entregado
              </p>
              <p className="text-white/60">
                El pedido fue entregado en la dirección indicada o retirado en
                el punto de entrega correspondiente.
              </p>
            </li>
          </ol>
        </aside>
      </section>
    </div>
  );
}
