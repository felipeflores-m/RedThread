import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CatalogApi, type Product, type Variant, type ProductImage } from "@/api/catalog.api";
import { useCart } from "@/store/cart.store";
import { useToast } from "@/store/toast.store";
import { buildCatalogImageUrl } from "@/api/http";

function formatCLP(value: number): string {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);

  const { lines, add } = useCart();
  const { show } = useToast();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!Number.isFinite(productId) || productId <= 0) {
        setProduct(null);
        setVariants([]);
        setImages([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [pRes, vRes, iRes] = await Promise.all([
          CatalogApi.getProduct(productId),
          CatalogApi.listVariantsByProduct(productId),
          // OJO: este método debes tenerlo en catalog.api.ts:
          // listProductImages: (productId) => http.catalog.get<ProductImage[]>(`/products/${productId}/images`)
          CatalogApi.listProductImages(productId),
        ]);

        if (!alive) return;

        setProduct(pRes.data);
        setVariants(Array.isArray(vRes.data) ? vRes.data : []);
        setImages(Array.isArray(iRes.data) ? iRes.data : []);

        const firstVariant = (Array.isArray(vRes.data) ? vRes.data : [])[0]?.id ?? null;
        setSelectedVariantId(firstVariant);
      } catch (err) {
        console.error("Error cargando detalle:", err);
        if (!alive) return;
        setProduct(null);
        setVariants([]);
        setImages([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [productId]);

  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    if (!selectedVariantId) return variants[0];
    return variants.find((v) => v.id === selectedVariantId) || variants[0];
  }, [variants, selectedVariantId]);

  // Imagen principal (prioriza primary si existe)
  const mainImageUrl = useMemo(() => {
    if (!images?.length) return undefined;
    const primary = images.find((i) => i.primary) || images[0];
    return buildCatalogImageUrl(primary?.publicUrl);
  }, [images]);

  const title = product?.name ?? "Producto";
  const description = product?.description ?? "";
  const categoryName = product?.category?.name ?? "";

  // Precio: variante (priceOverride) o producto (basePrice)
  const price = useMemo(() => {
    const vPrice = selectedVariant?.priceOverride;
    if (typeof vPrice === "number") return vPrice;
    if (typeof product?.basePrice === "number") return product.basePrice;
    return 0;
  }, [selectedVariant, product]);

  // Stock disponible (como tu app): preferimos stock en variante; si no, inventory.stockAvailable
  const stockDisponible = useMemo(() => {
    // @ts-ignore - por si tu backend manda "stock" pero tu tipo Variant no lo tiene tipado aún
    const directStock = (selectedVariant as any)?.stock;
    if (typeof directStock === "number") return directStock;

    const invStock = selectedVariant?.inventory?.stockAvailable;
    if (typeof invStock === "number") return invStock;

    return 0;
  }, [selectedVariant]);

  // Cantidad ya en el carrito para esta variante (igual que Android)
  const qtyEnCarritoParaVariante = useMemo(() => {
    const vid = selectedVariant?.id;
    if (!vid) return 0;
    return lines
      .filter((l) => l.variantId === vid)
      .reduce((sum, l) => sum + (Number(l.qty) || 0), 0);
  }, [lines, selectedVariant?.id]);

  // Stock restante considerando carrito
  const stockRestante = useMemo(() => {
    return Math.max(0, stockDisponible - qtyEnCarritoParaVariante);
  }, [stockDisponible, qtyEnCarritoParaVariante]);

  // Ajusta cantidad si excede stock restante
  useEffect(() => {
    if (stockRestante <= 0) {
      setQty(1);
      return;
    }
    setQty((q) => {
      if (q < 1) return 1;
      if (q > stockRestante) return stockRestante;
      return q;
    });
  }, [stockRestante]);

  const canAdd = !!product && !!selectedVariant && stockRestante > 0;

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const restante = Math.max(0, stockDisponible - qtyEnCarritoParaVariante);
    if (restante <= 0) {
      show("Ya tienes el máximo stock en el carrito para esta variante.", "error");
      return;
    }

    const finalQty = Math.min(Math.max(qty, 1), restante);

    const img = images?.length
      ? buildCatalogImageUrl((images.find((i) => i.primary) || images[0]).publicUrl)
      : undefined;

    add({
      variantId: selectedVariant.id,
      nombre: product.name,
      precio: Number(selectedVariant.priceOverride ?? product.basePrice ?? 0),
      qty: finalQty,
      talla: selectedVariant.sizeValue,
      color: selectedVariant.color,
      image: img,
    });

    show("Producto agregado al carrito", "success");
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-neutral-950 to-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="h-6 w-40 rounded bg-white/10 animate-pulse" />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 w-2/3 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
              <div className="h-8 w-40 rounded bg-white/10 animate-pulse" />
              <div className="h-12 w-full rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-neutral-950 to-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-white/70">No se encontró el producto.</p>
          <Link to="/catalog" className="mt-4 inline-block btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-white/60">
          <Link to="/catalog" className="hover:text-white">Tienda</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{title}</span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Imagen */}
          <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
            <div className="aspect-square w-full bg-black flex items-center justify-center">
              {mainImageUrl ? (
                <img
                  src={mainImageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-white/50">Sin imagen</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
                {categoryName ? (
                  <p className="mt-1 text-sm text-white/60">{categoryName}</p>
                ) : null}
              </div>

              <div className="text-right">
                <div className="text-2xl font-semibold">{formatCLP(Number(price ?? 0))}</div>
                <div
                  className={`mt-1 text-sm font-medium ${
                    stockRestante > 0 ? "text-emerald-300" : "text-red-300"
                  }`}
                >
                  {stockRestante > 0
                    ? `Stock disponible: ${stockRestante}`
                    : "Sin stock"}
                </div>
              </div>
            </div>

            {description ? (
              <p className="mt-4 text-white/70 leading-relaxed">{description}</p>
            ) : (
              <p className="mt-4 text-white/50">Sin descripción.</p>
            )}

            {/* Variantes */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs text-white/60">Talla / Color</label>
                <select
                  value={selectedVariant?.id ?? ""}
                  onChange={(e) => setSelectedVariantId(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none focus:border-white/30"
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id} className="bg-black">
                      {v.sizeValue} · {v.color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cantidad */}
              <div>
                <label className="text-xs text-white/60">Cantidad</label>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={!canAdd || qty <= 1}
                    className="h-11 w-11 rounded-xl border border-white/10 bg-black/60 hover:bg-white/5 disabled:opacity-40"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={Math.max(stockRestante, 1)}
                    value={qty}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (!Number.isFinite(n)) return;
                      setQty(n);
                    }}
                    disabled={!canAdd}
                    className="h-11 w-20 rounded-xl border border-white/10 bg-black/60 px-3 text-center text-sm outline-none focus:border-white/30 disabled:opacity-40"
                  />

                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(stockRestante, q + 1))}
                    disabled={!canAdd || qty >= stockRestante}
                    className="h-11 w-11 rounded-xl border border-white/10 bg-black/60 hover:bg-white/5 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {qtyEnCarritoParaVariante > 0 ? (
                  <p className="mt-2 text-xs text-white/50">
                    Ya tienes {qtyEnCarritoParaVariante} en el carrito para esta variante.
                  </p>
                ) : null}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!canAdd}
                className="btn btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Agregar al carrito
              </button>

              {!variants.length ? (
                <p className="mt-3 text-xs text-white/50">
                  Este producto no tiene variantes creadas (talla/color). Crea al menos una variante con stock.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
