import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CatalogApi, type Product, type Variant } from "@/api/catalog.api";
import { useCart } from "@/store/cart.store";
import { buildCatalogImageUrl } from "@/api/http";
import { useToast } from "@/store/toast.store";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { add } = useCart();
  const { show } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const productId = Number(id);
    if (Number.isNaN(productId)) return;

    setLoading(true);
    Promise.all([
      CatalogApi.getProduct(productId),
      CatalogApi.listVariantsByProduct(productId),
    ])
      .then(([pRes, vRes]) => {
        setProduct(pRes.data);
        const list = Array.isArray(vRes.data) ? vRes.data : [];
        setVariants(list);
        if (list.length > 0) {
          setSelectedVariantId(list[0].id);
        }
      })
      .catch((err) => {
        console.error("Error al cargar producto:", err);
        setProduct(null);
        setVariants([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <p className="text-sm text-white/70">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <p className="text-sm text-white/70">No encontramos el producto.</p>
        <Link to="/catalog" className="mt-3 inline-block text-sm text-red-400">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) ?? null;

  const stockDisponible =
    selectedVariant?.inventory?.stockAvailable ?? undefined;

  const precioBase = Number(product.basePrice ?? 0);
  const precio = Number(
    selectedVariant?.priceOverride ?? product.basePrice ?? 0
  );

  const handleAddToCart = () => {
    const variantId = selectedVariant?.id ?? product.id;

    const firstImage =
      product.images && product.images.length > 0
        ? product.images[0].publicUrl
        : undefined;

    add({
      variantId,
      nombre: product.name,
      talla: selectedVariant?.sizeValue,
      color: selectedVariant?.color,
      precio,
      qty,
      image: buildCatalogImageUrl(firstImage),
    });

    show("Producto agregado al carrito", "success");
  };

  const handleIncrease = () => {
    if (stockDisponible && qty >= stockDisponible) return;
    setQty((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Imagen principal */}
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-4 md:p-6">
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-900">
            {product.images && product.images.length > 0 ? (
              <img
                src={buildCatalogImageUrl(
                  product.images.find((img) => img.primary)?.publicUrl ??
                    product.images[0].publicUrl
                )}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Sin imagen
              </div>
            )}
          </div>
        </div>

        {/* Info derecha (precio, stock, variantes, agregar al carrito, etc.) */}
        {/* ...deja aquí tu layout actual y solo asegura que handleAddToCart se usa en el botón principal... */}
      </div>
    </div>
  );
}
