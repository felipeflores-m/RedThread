import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">
            Resumen
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold">
            Carrito de compras
          </h1>
          <p className="mt-2 text-sm text-white/65 max-w-xl">
            Revisa los productos que agregarás a tu pedido antes de continuar
            con el pago.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-white/60">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#D32F2F] text-[11px] font-semibold">
            i
          </span>
          <span>
            Tu carrito se guarda asociado a tu cuenta para que puedas retomarlo
            desde cualquier dispositivo.
          </span>
        </div>
      </header>

      {/* Estado vacío */}
      <section className="rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-black px-6 py-10 md:px-10 md:py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700/70 bg-neutral-900/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <svg
            className="h-7 w-7 text-white/75"
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
        </div>

        <h2 className="mt-6 text-xl font-semibold">Tu carrito está vacío</h2>
        <p className="mt-2 text-sm text-white/65 max-w-md mx-auto">
          Explora nuestro catálogo y agrega tus prendas favoritas. Aquí verás el
          detalle de productos, tallas, cantidades y montos a pagar.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/catalog"
            className="inline-flex items-center rounded-md bg-[#D32F2F] px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Explorar catálogo
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-md border border-neutral-700 px-4 py-2.5 text-sm font-medium text-white/85 hover:bg-neutral-900 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-white/45">
          Una vez confirmada la compra, recibirás un correo con el resumen del
          pedido y el seguimiento del envío.
        </p>
      </section>
    </div>
  );
}
