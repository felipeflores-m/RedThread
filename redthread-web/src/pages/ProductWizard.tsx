import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CatalogApi } from "@/api/catalog.api";
import type { Category, Brand } from "@/api/catalog.api";

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
  });

  const [variant, setVariant] = useState({
    sizeType: "",
    sizeValue: "",
    color: "",
    sku: "",
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState(""); // nuevo campo para URL

  const letterSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const euSizes = Array.from({ length: 8 }, (_, i) => (39 + i).toString());

  useEffect(() => {
    CatalogApi.listCategories().then((res) => setCategories(res.data));
    CatalogApi.listBrands().then((res) => setBrands(res.data));
  }, []);

  // === Paso 1: Crear producto ===
  const handleCreateProduct = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      if (!form.nombre.trim()) {
        alert("El nombre es obligatorio");
        return;
      }
      if (!form.categoryId || !form.brandId) {
        alert("Debes seleccionar categoría y marca válidas");
        return;
      }
      if (!form.precioBase) {
        alert("El precio base es obligatorio");
        return;
      }

      const payload = {
        categoryId: form.categoryId,
        brandId: form.brandId,
        name: form.nombre,
        description: form.descripcion,
        basePrice: Number(form.precioBase),
      };

      const res = await CatalogApi.createProduct(payload);
      setProductId(res.data.id);
      alert("Producto creado correctamente. Ahora agrega una variante.");
      setStep(2);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Error desconocido";
      alert(msg);
    }
  };

  // === Paso 2: Crear variante ===
  const handleCreateVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      alert("Primero crea un producto.");
      return;
    }

    try {
      if (!variant.sizeType || !variant.sizeValue) {
        alert("Selecciona tipo y valor de talla válidos");
        return;
      }

      const payload = {
        productId,
        sizeType: variant.sizeType,
        sizeValue: variant.sizeValue,
        color: variant.color,
        sku: variant.sku,
      };

      await CatalogApi.createVariant(payload);
      alert("Variante agregada correctamente. Ahora sube una imagen.");
      setStep(3);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Error desconocido";
      alert(msg);
    }
  };

  // === Paso 3: Subir imagen (desde PC o desde URL) ===
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      alert("Producto inválido");
      return;
    }

    try {
      if (imageUrl.trim()) {
        // si el usuario pega una URL
        await CatalogApi.uploadImageFromUrl(productId, { url: imageUrl });
      } else if (files?.length) {
        // si sube archivo local
        const formData = new FormData();
        formData.append("file", files[0]);
        await CatalogApi.uploadImage(productId, formData);
      } else {
        alert("Selecciona un archivo o pega una URL");
        return;
      }

      alert("Imagen subida correctamente. Producto completado.");
      navigate("/admin");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Error desconocido";
      alert(msg);
    }
  };

  const steps = [
    { num: 1, label: "Producto" },
    { num: 2, label: "Variante" },
    { num: 3, label: "Imagen" },
  ];

  return (
    <div className="flex flex-col items-center p-8 text-white bg-[#121212] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#D32F2F]">Crear producto</h1>

      {/* Barra de pasos */}
      <div className="flex gap-4 mb-8">
        {steps.map((s) => (
          <div
            key={s.num}
            className={`px-4 py-2 rounded-lg border ${
              step === s.num
                ? "bg-[#D32F2F] border-[#D32F2F]"
                : "border-[#444] text-[#9E9E9E]"
            }`}
          >
            {s.num}. {s.label}
          </div>
        ))}
      </div>

      {/* Paso 1 */}
      {step === 1 && (
        <form
          onSubmit={handleCreateProduct}
          className="flex flex-col gap-3 bg-[#1A1A1A] p-6 rounded-xl w-[400px]"
        >
          <h2 className="text-lg font-semibold mb-2">Paso 1: Datos del producto</h2>
          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="bg-[#2A2A2A] p-2 rounded text-white"
          />
          <input
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="bg-[#2A2A2A] p-2 rounded text-white"
          />

          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: Number(e.target.value) })
            }
            className="bg-[#2A2A2A] p-2 rounded text-white"
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
            className="bg-[#2A2A2A] p-2 rounded text-white"
          >
            <option value={0}>Selecciona una marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Precio base"
            type="number"
            value={form.precioBase}
            onChange={(e) => setForm({ ...form, precioBase: e.target.value })}
            className="bg-[#2A2A2A] p-2 rounded text-white"
          />

          <button
            type="submit"
            className="bg-[#D32F2F] hover:bg-[#b71c1c] py-2 rounded mt-2"
          >
            Crear producto
          </button>
        </form>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <form
          onSubmit={handleCreateVariant}
          className="flex flex-col gap-3 bg-[#1A1A1A] p-6 rounded-xl w-[400px]"
        >
          <h2 className="text-lg font-semibold mb-2">Paso 2: Agregar variante</h2>

          <label className="text-sm text-white font-medium">
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
              className="mt-1 bg-[#2A2A2A] p-2 rounded text-white w-full"
            >
              <option value="">Selecciona tipo</option>
              <option value="EU">EU</option>
              <option value="LETTER">LETTER</option>
            </select>
          </label>

          {variant.sizeType && (
            <label className="text-sm text-white font-medium">
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
                className="mt-1 bg-[#2A2A2A] p-2 rounded text-white w-full"
              >
                <option value="">Selecciona talla</option>
                {(variant.sizeType === "EU" ? euSizes : letterSizes).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="text-sm text-white font-medium">
            Color
            <input
              placeholder="Ej: Negro, Azul, Rojo"
              value={variant.color}
              onChange={(e) => {
                const color = e.target.value;
                setVariant((prev) => ({
                  ...prev,
                  color,
                  sku: generateSku(prev.sizeValue, color, prev.sizeType),
                }));
              }}
              className="mt-1 bg-[#2A2A2A] p-2 rounded text-white w-full"
            />
          </label>

          <label className="text-sm text-white font-medium">
            SKU (autogenerado)
            <input
              value={variant.sku}
              readOnly
              className="mt-1 bg-[#2A2A2A] p-2 rounded text-white w-full opacity-70 cursor-not-allowed"
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#D32F2F]"
            >
              ← Volver
            </button>
            <button
              type="submit"
              className="bg-[#D32F2F] hover:bg-[#b71c1c] py-2 px-4 rounded"
            >
              Agregar variante
            </button>
          </div>
        </form>
      )}

      {/* Paso 3 */}
      {step === 3 && (
        <form
          onSubmit={handleUploadImage}
          className="flex flex-col gap-3 bg-[#1A1A1A] p-6 rounded-xl w-[400px]"
        >
          <h2 className="text-lg font-semibold mb-2">Paso 3: Subir imagen</h2>

          {/* Nuevo campo para pegar una URL */}
          <input
            type="url"
            placeholder="Pega la URL de una imagen (opcional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-[#2A2A2A] p-2 rounded text-white"
          />

          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            className="bg-[#2A2A2A] p-2 rounded text-white"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-[#D32F2F]"
            >
              ← Volver
            </button>
            <button
              type="submit"
              className="bg-[#D32F2F] hover:bg-[#b71c1c] py-2 px-4 rounded"
            >
              Subir y finalizar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
