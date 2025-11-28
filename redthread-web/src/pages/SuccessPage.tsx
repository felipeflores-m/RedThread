import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-3xl font-semibold text-green-400 mb-3">
        ¡Pago exitoso!
      </h1>
      <p className="text-white/70 mb-6 max-w-sm">
        Tu pedido ha sido registrado correctamente. Recibirás un correo con el
        resumen y seguimiento.
      </p>

      <Link
        to="/"
        className="rounded-md bg-red-600 px-5 py-2 text-white font-medium hover:bg-red-700 transition"
      >
        Volver a comprar
      </Link>
    </div>
  );
}
