import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CatalogApi } from "@/api/catalog.api";
import type { Product } from "@/api/catalog.api";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    CatalogApi.getProduct(Number(id))
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error al cargar producto:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-white text-center">Cargando producto...</p>;
  if (!product) return <p className="text-white text-center">Producto no encontrado</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <Link
        to="/catalog"
        className="text-[#D32F2F] hover:underline mb-4 inline-block"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="flex justify-center items-center bg-[#1A1A1A] rounded-lg p-4">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].publicUrl}
              alt={product.name}
              className="rounded-lg max-h-[400px] object-contain"
            />
          ) : (
            <span className="text-white/60 text-sm">Sin imagen</span>
          )}
        </div>

        {/* Información */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-[#9E9E9E] mb-4">{product.description}</p>

          <div className="text-xl font-semibold text-[#D32F2F] mb-6">
            ${product.basePrice?.toLocaleString("es-CL")}
          </div>

          {product.brand && (
            <p className="text-sm mb-2">
              <span className="font-semibold">Marca:</span> {product.brand.name}
            </p>
          )}
          {product.category && (
            <p className="text-sm mb-4">
              <span className="font-semibold">Categoría:</span>{" "}
              {product.category.name}
            </p>
          )}

          <button className="bg-[#D32F2F] hover:bg-[#b71c1c] px-5 py-2 rounded text-white font-semibold mt-4">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
