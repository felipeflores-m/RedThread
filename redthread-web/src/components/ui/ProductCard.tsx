type Props = {
  name: string;
  priceCLP: number;
  image?: string;
};

export default function ProductCard({ name, priceCLP, image }: Props) {
  return (
    <div className="group card overflow-hidden">
      <div className="aspect-square bg-neutral-900/60">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
        ) : (
          <div className="h-full w-full grid place-content-center text-white/30 text-xs">Imagen</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm text-white/90 line-clamp-2">{name}</h3>
        <div className="mt-2 text-base font-semibold">{priceCLP.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</div>
        <button className="mt-3 w-full rounded-md bg-[#D32F2F] py-2 text-sm font-medium hover:bg-[#b72a2a]">Agregar</button>
      </div>
    </div>
  );
}
