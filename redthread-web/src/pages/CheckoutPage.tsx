import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/store/cart.store";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { clear } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      clear();                // ✅ VACÍA EL CARRITO
      navigate("/success");   // redirige a éxito
    }, 2500);

    return () => clearTimeout(timer);
  }, [clear, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full mb-6"></div>

      <h1 className="text-2xl font-semibold">Procesando pago…</h1>
      <p className="mt-2 text-white/60 max-w-sm">
        Estamos verificando el método de pago. Esto puede tardar unos segundos.
      </p>
    </div>
  );
}
