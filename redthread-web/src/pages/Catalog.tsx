import { useEffect, useState } from "react";
import { CatalogApi } from "@/api/catalog.api";
import type { Product } from "@/api/catalog.api";
import { Link } from "react-router-dom";

export default function Catalog() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    CatalogApi.listProducts()
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : [];
        console.log("Productos cargados:", data);
        setItems(data || []);
        setFiltered(data || []);
      })
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar localmente cuando cambia el texto del buscador
  useEffect(() => {
    if (!q.trim()) {
      setFiltered(items);
    } else {
      const lower = q.toLowerCase();
      setFiltered(
        items.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description?.toLowerCase().includes(lower)
        )
      );
    }
  }, [q, items]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <input
          className="bg-[#1A1A1A] text-white p-2 rounded w-full border border-[#333]"
          placeholder="Buscar productos..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-white">Cargando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-white/70">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <Link
              to={`/product/${p.id}`}
              key={p.id}
              className="bg-[#1A1A1A] rounded-lg p-4 hover:ring-2 hover:ring-[#D32F2F] transition-all"
            >
              <div className="aspect-square bg-neutral-800 rounded mb-3 overflow-hidden flex items-center justify-center">
                {p.images && p.images.length > 0 ? (
                  <img
                    src={p.images[0].publicUrl}
                    className="w-full h-full object-cover"
                    alt={p.name}
                  />
                ) : (
                  <div className="text-white/50 text-sm text-center">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="text-sm text-white/80 truncate">{p.name}</div>
              <div className="text-white font-semibold mt-1">
                ${p.basePrice?.toLocaleString("es-CL") || "0"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
