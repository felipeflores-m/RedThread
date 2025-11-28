export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Ayuda
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Cambios y devoluciones
        </h1>
        <p className="max-w-2xl text-sm text-white/65">
          Queremos que te sientas conforme con tu compra. Si algo no resulta
          como esperabas, puedes solicitar un cambio o devolución dentro de los
          plazos indicados.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-8">
          <h2 className="text-lg font-semibold">Política general</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/72 space-y-2">
            <li>Plazo de 30 días corridos desde la recepción del producto.</li>
            <li>
              La prenda debe estar sin uso, en buen estado y con sus etiquetas y
              embalaje original.
            </li>
            <li>
              Es necesario presentar la boleta o comprobante de compra asociado
              al pedido.
            </li>
          </ul>
          <p className="mt-3 text-xs text-white/55">
            Algunos productos pueden tener condiciones especiales de cambio por
            motivos de higiene. Esta información se indicará en la ficha del
            producto.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/85 to-black p-6 md:p-8">
          <h2 className="text-sm font-semibold text-white/85">
            ¿Cómo iniciar un cambio?
          </h2>
          <ol className="mt-4 space-y-4 text-sm text-white/70">
            <li>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold mr-2">
                1
              </span>
              Escríbenos a soporte indicando tu número de pedido y el motivo del
              cambio o devolución.
            </li>
            <li>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold mr-2">
                2
              </span>
              Nuestro equipo revisará el caso y te enviará las instrucciones
              para el envío o entrega del producto.
            </li>
            <li>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold mr-2">
                3
              </span>
              Una vez recibido y revisado, gestionaremos el cambio, nota de
              crédito o devolución según corresponda.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
