import { useEffect, useState } from "react";
import { CatalogApi, Product } from "@/api/catalog.api";
import { Link } from "react-router-dom";

export default function Catalog() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    CatalogApi.listProducts({ q }).then(r => setItems(r.data.results)).finally(()=>setLoading(false));
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center gap-3 mb-6">
        <input className="input" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      {loading ? <p>Cargando...</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="card p-4 hover:ring-2 hover:ring-brand-red">
              <div className="aspect-square bg-neutral-800 rounded mb-3 overflow-hidden">
                {p.images?.[0] && <img src={p.images[0]} className="w-full h-full object-cover" />}
              </div>
              <div className="text-sm text-white/80">{p.nombre}</div>
              <div className="text-white font-semibold mt-1">${p.precioBase?.toLocaleString("es-CL")}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
