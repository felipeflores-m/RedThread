import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CatalogApi } from "@/api/catalog.api";
import type { Category, Brand } from "@/api/catalog.api";
import type { AxiosError } from "axios";
import { X } from "lucide-react";

function generateSku(sizeValue: string, color: string, sizeType: string) {
  const clean = (txt: string) =>
    txt ? txt.replace(/\s+/g, "").toUpperCase().substring(0, 6) : "X";
  const date = new Date().getTime().toString().slice(-4);
  return `SKU-${clean(sizeType)}-${clean(sizeValue)}-${clean(color)}-${date}`;
}

export default function ProductWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoryId: 0,
    brandId: 0,
    precioBase: "",
    gender: "",
    featured: false,
  });

  const [variant, setVariant] = useState({
    sizeType: "",
    sizeValue: "",
    color: "",
    sku: "",
    stock: 0,
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const letterSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const euSizes = Array.from({ length: 8 }, (_, i) => (39 + i).toString());

  useEffect(() => {
    CatalogApi.listCategories().then((res) => setCategories(res.data));
    CatalogApi.listBrands().then((res) => setBrands(res.data));
  }, []);

  /* ===============================
     Paso 1: Crear PRODUCTO
  =============================== */
  const handleCreateProduct = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      if (!form.nombre.trim()) return alert("El nombre es obligatorio");
      if (!form.categoryId || !form.brandId)
        return alert("Selecciona una categoría y marca válidas");
      if (!form.precioBase) return alert("El precio base es obligatorio");
      if (!form.gender) return alert("Debes seleccionar un género");

      const payload = {
        categoryId: form.categoryId,
        brandId: form.brandId,
        name: form.nombre,
        description: form.descripcion,
        basePrice: Number(form.precioBase),
        featured: form.featured,
        gender: form.gender,
      };

      const res = await CatalogApi.createProduct(payload);

      setProductId(res.data.id);
      alert("Producto creado correctamente. Ahora agrega una variante.");
      setStep(2);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string; error?: string }>;

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error desconocido"
      );
    }
  };

  /* ===============================
     Paso 2: Crear VARIANTE sin override
  =============================== */
  const handleCreateVariant = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) return alert("Primero crea un producto.");

    try {
      if (!variant.sizeType || !variant.sizeValue)
        return alert("Selecciona tipo y valor de talla válidos");

      const payload = {
        productId,
        sizeType: variant.sizeType as "EU" | "LETTER",
        sizeValue: variant.sizeValue,
        color: variant.color,
        sku: variant.sku,
        stock: variant.stock ? Number(variant.stock) : 0,
      };

      await CatalogApi.createVariant(payload);

      alert("Variante agregada correctamente. Ahora sube una imagen.");
      setStep(3);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string; error?: string }>;

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error desconocido"
      );
    }
  };

  /* ===============================
     Paso 3: Subir IMAGEN
  =============================== */
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) return alert("Producto inválido");

    try {
      if (imageUrl.trim()) {
        await CatalogApi.uploadImageFromUrl(productId, { url: imageUrl });
      } else if (files?.length) {
        const formData = new FormData();
        formData.append("file", files[0]);
        await CatalogApi.uploadImage(productId, formData);
      } else {
        return alert("Selecciona un archivo o pega una URL");
      }

      alert("Imagen subida correctamente. Producto completado.");
      navigate("/admin");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string; error?: string }>;

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error desconocido"
      );
    }
  };

  /* ===============================
     UI
  =============================== */

  const steps = [
    { num: 1, label: "Producto" },
    { num: 2, label: "Variante" },
    { num: 3, label: "Imagen" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Contenedor con borde degradado tipo login/register */}
      <div className="w-full max-w-4xl px-[1px] rounded-3xl bg-gradient-to-br from-[#ff5252] via-[#e91e63] to-[#7c4dff] shadow-2xl">
        <div className="flex flex-col items-center p-8 text-white bg-[#0f0f10] rounded-[1.4rem] max-h-[90vh] overflow-y-auto">
          {/* Header modal */}
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.2em] text-[#ff8a80]">
                Panel administrador
              </span>
              <h1 className="text-2xl font-bold text-white mt-1">
                Crear producto
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="p-2 rounded-full hover:bg-white/10 text-[#E0E0E0] transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Pasos */}
          <div className="flex gap-4 mb-8">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  step === s.num
                    ? "bg-white text-[#1A1A1A] border-white shadow-md"
                    : "border-white/20 text-[#BDBDBD]"
                }`}
              >
                {s.num}. {s.label}
              </div>
            ))}
          </div>

          {/* PASO 1 — PRODUCTO */}
          {step === 1 && (
            <form
              onSubmit={handleCreateProduct}
              className="flex flex-col gap-3 bg-[#151518]/90 border border-white/10 p-6 rounded-2xl w-[400px]"
            >
              <h2 className="text-lg font-semibold mb-2">
                Paso 1: Datos del producto
              </h2>

              <input
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="bg-[#202027] p-2 rounded text-white placeholder:text-[#9E9E9E] text-sm border border-transparent focus:border-[#ff5252] outline-none"
              />

              <input
                placeholder="Descripción"
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                className="bg-[#202027] p-2 rounded text-white placeholder:text-[#9E9E9E] text-sm border border-transparent focus:border-[#ff5252] outline-none"
              />

              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: Number(e.target.value) })
                }
                className="bg-[#202027] p-2 rounded text-white text-sm border border-transparent focus:border-[#ff5252] outline-none"
              >
                <option value={0}>Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={form.brandId}
                onChange={(e) =>
                  setForm({ ...form, brandId: Number(e.target.value) })
                }
                className="bg-[#202027] p-2 rounded text-white text-sm border border-transparent focus:border-[#ff5252] outline-none"
              >
                <option value={0}>Selecciona una marca</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="bg-[#202027] p-2 rounded text-white text-sm border border-transparent focus:border-[#ff5252] outline-none"
              >
                <option value="">Selecciona género</option>
                <option value="HOMBRE">Hombre</option>
                <option value="MUJER">Mujer</option>
              </select>

              <label className="flex items-center gap-2 text-xs text-[#E0E0E0] mt-1">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="accent-[#ff5252]"
                />
                Destacado en página principal
              </label>

              <input
                placeholder="Precio base"
                type="number"
                value={form.precioBase}
                onChange={(e) =>
                  setForm({ ...form, precioBase: e.target.value })
                }
                className="bg-[#202027] p-2 rounded text-white placeholder:text-[#9E9E9E] text-sm border border-transparent focus:border-[#ff5252] outline-none"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff5252] via-[#ff1744] to-[#f50057] hover:brightness-110 py-2 rounded-lg mt-2 text-sm font-semibold shadow-md"
              >
                Crear producto
              </button>
            </form>
          )}

          {/* PASO 2 — VARIANTE */}
          {step === 2 && (
            <form
              onSubmit={handleCreateVariant}
              className="flex flex-col gap-3 bg-[#151518]/90 border border-white/10 p-6 rounded-2xl w-[400px]"
            >
              <h2 className="text-lg font-semibold mb-2">
                Paso 2: Agregar variante
              </h2>

              {/* Tipo talla */}
              <label className="text-xs text-[#E0E0E0] font-medium">
                Tipo de talla
                <select
                  value={variant.sizeType}
                  onChange={(e) =>
                    setVariant({
                      ...variant,
                      sizeType: e.target.value,
                      sizeValue: "",
                      sku: "",
                    })
                  }
                  className="mt-1 bg-[#202027] p-2 rounded text-white text-sm border border-transparent focus:border-[#ff5252] outline-none w-full"
                >
                  <option value="">Selecciona tipo</option>
                  <option value="EU">EU</option>
                  <option value="LETTER">LETTER</option>
                </select>
              </label>

              {/* Valor talla */}
              {variant.sizeType && (
                <label className="text-xs text-[#E0E0E0] font-medium">
                  Valor de talla
                  <select
                    value={variant.sizeValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVariant((prev) => ({
                        ...prev,
                        sizeValue: value,
                        sku: generateSku(value, prev.color, prev.sizeType),
                      }));
                    }}
                    className="mt-1 bg-[#202027] p-2 rounded text-white text-sm border border-transparent focus:border-[#ff5252] outline-none w-full"
                  >
                    <option value="">Selecciona talla</option>
                    {(variant.sizeType === "EU" ? euSizes : letterSizes).map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </label>
              )}

              {/* Color */}
              <label className="text-xs text-[#E0E0E0] font-medium">
                Color
                <input
                  placeholder="Ej: Negro, Azul"
                  value={variant.color}
                  onChange={(e) => {
                    const color = e.target.value;
                    setVariant((prev) => ({
                      ...prev,
                      color,
                      sku: generateSku(prev.sizeValue, color, prev.sizeType),
                    }));
                  }}
                  className="mt-1 bg-[#202027] p-2 rounded text-white text-sm placeholder:text-[#9E9E9E] border border-transparent focus:border-[#ff5252] outline-none w-full"
                />
              </label>

              {/* Stock */}
              <label className="text-xs text-[#E0E0E0] font-medium">
                Stock inicial
                <input
                  type="number"
                  min={0}
                  placeholder="Ej: 10"
                  onChange={(e) =>
                    setVariant({ ...variant, stock: Number(e.target.value) })
                  }
                  className="mt-1 bg-[#202027] p-2 rounded text-white text-sm placeholder:text-[#9E9E9E] border border-transparent focus:border-[#ff5252] outline-none w-full"
                />
              </label>

              {/* SKU */}
              <label className="text-xs text-[#E0E0E0] font-medium">
                SKU (autogenerado)
                <input
                  value={variant.sku}
                  readOnly
                  className="mt-1 bg-[#202027] p-2 rounded text-white text-sm opacity-70 cursor-not-allowed border border-dashed border-white/20 w-full"
                />
              </label>

              <div className="flex justify-between mt-4 text-sm">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#ff8a80] hover:text-white transition"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#ff5252] via-[#ff1744] to-[#f50057] hover:brightness-110 py-2 px-4 rounded-lg font-semibold shadow-md"
                >
                  Agregar variante
                </button>
              </div>
            </form>
          )}

          {/* PASO 3 — IMAGEN */}
          {step === 3 && (
            <form
              onSubmit={handleUploadImage}
              className="flex flex-col gap-3 bg-[#151518]/90 border border-white/10 p-6 rounded-2xl w-[400px]"
            >
              <h2 className="text-lg font-semibold mb-2">
                Paso 3: Subir imagen
              </h2>

              <input
                type="url"
                placeholder="Pega la URL de una imagen (opcional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-[#202027] p-2 rounded text-white text-sm placeholder:text-[#9E9E9E] border border-transparent focus:border-[#ff5252] outline-none"
              />

              <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                className="bg-[#202027] p-2 rounded text-white text-sm border border-transparent focus:border-[#ff5252] outline-none"
              />

              <div className="flex justify-between mt-4 text-sm">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[#ff8a80] hover:text-white transition"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#ff5252] via-[#ff1744] to-[#f50057] hover:brightness-110 py-2 px-4 rounded-lg font-semibold shadow-md"
                >
                  Subir y finalizar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
