export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Legal
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Términos y condiciones
        </h1>
        <p className="max-w-2xl text-sm text-white/65">
          Estos términos regulan el uso del sitio web de RedThread y las
          compras realizadas a través de nuestra tienda en línea.
        </p>
      </header>

      <section className="space-y-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-8 text-sm text-white/72">
        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            1. Uso del sitio
          </h2>
          <p>
            Al navegar y realizar compras en RedThread, aceptas estos términos y
            te comprometes a hacer un uso responsable del sitio, respetando las
            leyes vigentes y los derechos de otros usuarios.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            2. Precios y disponibilidad
          </h2>
          <p>
            Los precios publicados incluyen impuestos, salvo que se indique lo
            contrario, y pueden modificar­se sin previo aviso. La disponibilidad
            de los productos está sujeta a stock, el que se actualiza
            permanentemente en la plataforma.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            3. Compras y pagos
          </h2>
          <p>
            Una compra se considera confirmada cuando el pago ha sido
            autorizado por el medio de pago correspondiente. En caso de
            inconvenientes con la transacción o stock, nuestro equipo se
            pondrá en contacto contigo para ofrecer alternativas o la devolución
            del monto pagado.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            4. Cuentas de usuario
          </h2>
          <p>
            Es responsabilidad del usuario mantener la confidencialidad de su
            contraseña y la información asociada a su cuenta. Te recomendamos
            utilizar claves seguras y cambiarlas periódicamente.
          </p>
        </div>

        <p className="text-xs text-white/55 pt-2 border-t border-neutral-800/70">
          Si tienes dudas sobre estos términos, puedes contactarnos a través de
          nuestro canal de soporte.
        </p>
      </section>
    </div>
  );
}
