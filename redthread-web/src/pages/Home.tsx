import ProductCard from "../components/ui/ProductCard";
import { Link } from "react-router-dom";

export default function Home() {
    // Datos dummy por ahora (luego vendrán de CatalogApi)
    const featured = [
        { id: 1, name: "Zapatilla Runner Pro 41", price: 49990 },
        { id: 2, name: "Polerón Urban Fit", price: 34990 },
        { id: 3, name: "Polera Essentials", price: 12990 },
        { id: 4, name: "Chaqueta Softshell", price: 69990 },
        { id: 5, name: "Jogger Street", price: 27990 },
        { id: 6, name: "Zapatilla Street 42", price: 54990 },
        { id: 7, name: "Cinturón cuero", price: 15990 },
        { id: 8, name: "Gorra Classic", price: 9990 },
    ];

    return (
        <div>
            {/* HERO (full-bleed + degradado hasta el borde superior) */}
            <section
                className="
    relative overflow-hidden
    mx-[calc(50%-50vw)]
  "
            >
                {/* Fondo rojo extendido y con z-index negativo */}
                <div
                    className="
      pointer-events-none absolute inset-x-0 -top-[180px]
      h-[750px] md:h-[850px]
      bg-[radial-gradient(1800px_900px_at_0%_-10%,rgba(211,47,47,0.38),transparent_75%)]
      blur-[48px]
      -z-10
    "
                />

                {/* Contenido */}
                <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-20">
                    <div className="grid gap-8 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/60">Colección 2025</p>
                            <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                                Estilo <span className="text-[#D32F2F]">urbano</span> para todos los días
                            </h1>
                            <p className="mt-3 text-white/70 max-w-xl">
                                Ropa y calzado con personalidad. Calidad real, tallas correctas (39–45) y envíos rápidos.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a href="/catalog" className="btn btn-primary">Ver catálogo</a>
                            </div>
                        </div>

                        <div className="order-first md:order-none">
                            <div
                                className="
            aspect-[5/4] rounded-xl border border-neutral-800 
            bg-[url('https://media.discordapp.net/attachments/828708800504135750/1436059419778482317/urban-style-defined-guide-edgy-fashion-movement_1200x674.png?ex=690e3a0e&is=690ce88e&hm=7dda484849c8fb244eba8a4a7cfdaf552d22aaba920d6d2041bc24c8d86216a0&=&format=webp&quality=lossless&width=1658&height=932')]
            bg-cover bg-center shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
          "
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORÍAS */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                <h2 className="text-xl font-semibold mb-4">Compra por categoría</h2>
                <div className="flex flex-wrap gap-3">
                    {["Zapatillas", "Poleras", "Polerones", "Chaquetas", "Pantalones", "Accesorios"].map(c => (
                        <button key={c} className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-white/85 hover:bg-neutral-900">
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            {/* DESTACADOS */}
            <section className="mx-auto max-w-7xl px-4 pb-14">
                <div className="flex items-baseline justify-between">
                    <h2 className="text-xl font-semibold">Novedades</h2>
                    <Link to="/catalog" className="text-sm text-white/70 hover:text-white">Ver todo</Link>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {featured.map(p => (
                        <ProductCard key={p.id} name={p.name} priceCLP={p.price} />
                    ))}
                </div>
            </section>
        </div>
    );
}
