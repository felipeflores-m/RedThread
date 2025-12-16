import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import { CatalogApi, type Product, type Category } from "@/api/catalog.api";
import { useCart } from "@/store/cart.store";
import { useToast } from "@/store/toast.store";
import { buildCatalogImageUrl } from "@/api/http";

type CategoryFilter = "ALL" | number;

export default function Home() {
  const navigate = useNavigate();
  const { add } = useCart();
  const { show } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("ALL");

  // Cargar productos + imágenes por producto (porque /products no trae images)
  useEffect(() => {
    let alive = true;

    async function load() {
      setLoadingProducts(true);

      try {
        const res = await CatalogApi.listProducts();
        const list = Array.isArray(res.data) ? res.data : [];

        // Pedimos imágenes por producto y las inyectamos en el mismo objeto
        const withImages: Product[] = await Promise.all(
          list.map(async (p) => {
            try {
              const imgRes = await CatalogApi.listProductImages(p.id);
              const imgs = Array.isArray(imgRes.data) ? imgRes.data : [];
              return { ...p, images: imgs } as Product;
            } catch (e) {
              return { ...p, images: [] } as Product;
            }
          })
        );

        if (!alive) return;
        setProducts(withImages);
      } catch (err) {
        console.error("Error cargando productos para Home:", err);
        if (!alive) return;
        setProducts([]);
      } finally {
        if (!alive) return;
        setLoadingProducts(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  // Cargar categorías
  useEffect(() => {
    CatalogApi.listCategories()
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setCategories(list);
      })
      .catch((err) => {
        console.error("Error cargando categorías para Home:", err);
        setCategories([]);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((p) => p.category?.id === selectedCategory);

  // Para la sección de destacados solo mostramos los primeros 8
  const featured = filteredProducts.slice(0, 8);

  const handleAddToCart = (p: Product) => {
    const firstImage =
      p.images && p.images.length > 0 ? p.images[0].publicUrl : undefined;

    add({
      variantId: p.id,
      nombre: p.name,
      precio: Number(p.basePrice ?? 0),
      qty: 1,
      image: buildCatalogImageUrl(firstImage),
    });

    show("Producto agregado al carrito", "success");
  };

  const handleOpenDetail = (p: Product) => {
    navigate(`/product/${p.id}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#D32F2F] blur-[140px] opacity-30" />
          <div className="absolute bottom-[-10%] right-[-10%] h-72 w-72 rounded-full bg-blue-500 blur-[140px] opacity-25" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/60">
                Colección 2025
              </p>
              <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Estilo <span className="text-[#D32F2F]">urbano</span> para todos
                los días
              </h1>
              <p className="mt-3 text-white/70 max-w-xl">
                Ropa y calzado con personalidad. Calidad real, tallas correctas
                y envíos rápidos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/catalog" className="btn btn-primary">
                  Ver catálogo
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost border border-white/10"
                  onClick={() => {
                    const firstCategory = categories[0];
                    if (firstCategory) {
                      setSelectedCategory(firstCategory.id);
                    }
                  }}
                >
                  Ver categorías
                </button>
              </div>
            </div>

            {/* Imagen del HERO usando REDTHREAD-HOME.png */}
            <div className="order-first md:order-none">
              <div className="aspect-[5/4] rounded-xl border border-neutral-800 bg-black overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <img
                  src="/REDTHREAD-HOME.png"
                  alt="RedThread Home"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="border-y border-white/5 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6">
          <h2 className="text-sm font-semibold tracking-wide text-white/80">
            Compra por categoría
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory("ALL")}
              className={`rounded-full border px-4 py-2 text-xs md:text-sm ${
                selectedCategory === "ALL"
                  ? "border-[#D32F2F] bg-[#D32F2F] text-white"
                  : "border-white/10 bg-transparent text-white/80 hover:bg-white/5"
              }`}
            >
              Todas
            </button>

            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`rounded-full border px-4 py-2 text-xs md:text-sm ${
                  selectedCategory === c.id
                    ? "border-[#D32F2F] bg-[#D32F2F] text-white"
                    : "border-white/10 bg-transparent text-white/80 hover:bg-white/5"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADOS / LISTA DE PRODUCTOS */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">Novedades</h2>
          <Link
            to="/catalog"
            className="text-sm text-white/70 hover:text-white"
          >
            Ver todo
          </Link>
        </div>

        {loadingProducts ? (
          <p className="mt-6 text-sm text-white/70">Cargando productos...</p>
        ) : featured.length === 0 ? (
          <p className="mt-6 text-sm text-white/70">
            Todavía no hay productos creados en el catálogo.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => {
              const firstImage =
                p.images && p.images.length > 0 ? p.images[0].publicUrl : undefined;

              return (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  priceCLP={Number(p.basePrice ?? 0)}
                  image={buildCatalogImageUrl(firstImage)}
                  onAdd={() => handleAddToCart(p)}
                  onClick={() => handleOpenDetail(p)}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
