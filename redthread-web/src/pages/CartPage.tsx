import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/store/cart.store";

export default function CartPage() {
  const { lines, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  const total = lines.reduce((acc, l) => acc + l.precio * l.qty, 0);

  const handleChangeQty = (variantId: number, qty: number) => {
    if (qty < 1) return;
    setQty(variantId, qty);
  };

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
            con el pago. Puedes ajustar cantidades o eliminar ítems cuando
            quieras.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={clear}
            disabled={lines.length === 0}
            className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/75 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Vaciar carrito
          </button>
        </div>
      </header>

      {lines.length === 0 ? (
        <section className="rounded-xl border border-white/10 bg-neutral-950/60 px-5 py-10 text-center">
          <p className="text-sm text-white/70">
            Todavía no tienes productos en tu carrito.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center rounded-md border border-white/15 px-4 py-2 text-xs font-medium text-white/85 hover:bg-neutral-900 transition-colors"
          >
            Volver al inicio
          </Link>
        </section>
      ) : (
        <>
          {/* Lista de productos */}
          <section className="rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-5 md:px-6 md:py-6">
            <ul className="space-y-4">
              {lines.map((l) => (
                <li
                  key={l.variantId}
                  className="flex flex-col gap-3 border-b border-white/5 pb-4 last:border-none last:pb-0 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-900">
                      {l.image ? (
                        <img
                          src={l.image}
                          alt={l.nombre}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="grid h-full w-full place-content-center text-[10px] text-white/40">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {l.nombre}
                      </p>
                      {(l.talla || l.color) && (
                        <p className="mt-1 text-xs text-white/55">
                          {l.talla && <span>Talla: {l.talla}</span>}
                          {l.talla && l.color && <span> · </span>}
                          {l.color && <span>Color: {l.color}</span>}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-white/55">
                        Precio unitario:{" "}
                        {l.precio.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center rounded-full border border-white/15 bg-neutral-900/60 px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => handleChangeQty(l.variantId, l.qty - 1)}
                        className="px-2 text-sm text-white/80 hover:text-white"
                      >
                        −
                      </button>
                      <span className="mx-2 min-w-[2rem] text-center text-sm font-semibold">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleChangeQty(l.variantId, l.qty + 1)}
                        className="px-2 text-sm text-white/80 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {(l.precio * l.qty).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(l.variantId)}
                        className="mt-1 text-[11px] text-white/45 hover:text-white/80"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Resumen */}
          <section className="mt-6 rounded-xl border border-white/10 bg-neutral-950/60 px-5 py-6">
            <div className="flex items-center justify-between text-sm">
              <p className="text-white/70">Total productos</p>
              <p className="text-lg font-semibold">
                {total.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </p>
            </div>

            <p className="mt-2 text-[11px] text-white/45">
              Los costos de envío e impuestos se calcularán en el siguiente paso.
              Esta página es solo un simulador de carrito para la evaluación.
            </p>

            <div className="mt-5 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
              <Link
                to="/catalog"
                className="inline-flex items-center rounded-md border border-white/15 px-4 py-2 text-xs font-medium text-white/85 hover:bg-neutral-900 transition-colors"
              >
                Seguir comprando
              </Link>

              <button
                type="button"
                onClick={() => navigate("/checkout")}   // ← AQUÍ EL CAMBIO
                className="inline-flex items-center justify-center rounded-md bg-[#D32F2F] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b71c1c] transition-colors"
              >
                Continuar con el pago
              </button>
            </div>

            <p className="mt-4 text-[11px] text-white/45">
              Una vez confirmada la compra, recibirías un correo con el resumen
              del pedido y el seguimiento del envío.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
