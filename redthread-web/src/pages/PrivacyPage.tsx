export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          Legal
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Política de privacidad
        </h1>
        <p className="max-w-2xl text-sm text-white/65">
          Cuidar tus datos es una prioridad. Aquí te explicamos qué información
          recopilamos, cómo la utilizamos y cuáles son tus derechos.
        </p>
      </header>

      <section className="space-y-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 md:p-8 text-sm text-white/72">
        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            1. Información que recopilamos
          </h2>
          <p>
            Podemos solicitar datos como nombre, correo electrónico, dirección
            de envío, teléfono y preferencias de compra, necesarios para
            gestionar tus pedidos y mejorar tu experiencia en la tienda.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            2. Uso de la información
          </h2>
          <p>
            Utilizamos tus datos para procesar compras, coordinar envíos,
            comunicar el estado de los pedidos, ofrecer soporte y enviar
            información relevante sobre RedThread, siempre respetando tus
            preferencias de contacto.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            3. Protección de datos
          </h2>
          <p>
            Implementamos medidas técnicas y organizativas para resguardar tu
            información y evitar accesos no autorizados, pérdidas o
            modificaciones indebidas de los datos personales almacenados.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/85 mb-1">
            4. Tus derechos
          </h2>
          <p>
            Puedes solicitar la actualización, rectificación o eliminación de
            tus datos personales, así como revocar tu consentimiento para el
            envío de comunicaciones comerciales, contactándonos a través de
            nuestro canal de soporte.
          </p>
        </div>

        <p className="text-xs text-white/55 pt-2 border-t border-neutral-800/70">
          Si tienes consultas sobre el tratamiento de tus datos, escríbenos y
          te ayudaremos a resolverlas.
        </p>
      </section>
    </div>
  );
}
