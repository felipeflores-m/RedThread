import { buildCatalogImageUrl } from "@/api/http";

type Props = {
  name: string;
  priceCLP: number;
  image?: string;
  onAdd?: () => void;
  onClick?: () => void;
};

export default function ProductCard({
  name,
  priceCLP,
  image,
  onAdd,
  onClick,
}: Props) {
  const formattedPrice = priceCLP.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  const imgSrc = buildCatalogImageUrl(image);

  return (
    <div
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#121212] ring-1 ring-neutral-800/70 hover:ring-[#D32F2F] transition-all shadow-md hover:shadow-red-900/20"
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
            Imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col px-4 py-3">
        <h3 className="line-clamp-2 text-sm font-medium text-white">{name}</h3>
        <p className="mt-1 text-base font-semibold text-white">
          {formattedPrice}
        </p>

        <button
          type="button"
          className="mt-3 w-full rounded-md bg-[#D32F2F] py-2 text-sm font-medium text-white hover:bg-[#b72a2a]"
          onClick={(e) => {
            e.stopPropagation(); // Para que no dispare el onClick de la tarjeta
            onAdd?.();
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
