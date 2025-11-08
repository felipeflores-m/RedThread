import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Package,
  Users,
  Plus,
  Pencil,
} from "lucide-react";
import { CatalogApi } from "@/api/catalog.api";
import type { Product, Category, Brand } from "@/api/catalog.api";

export default function AdminVista() {
  const navigate = useNavigate();
  const [active, setActive] = useState("inicio");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoryId: 0,
    brandId: 0,
    precioBase: "",
  });

  // === Cargar productos ===
  useEffect(() => {
    if (active === "products") {
      setLoading(true);
      CatalogApi.listProducts()
        .then((res) => {
          const data = res.data?.results || res.data || [];
          setProducts(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Error al listar productos:", err);
          alert("Error al listar productos");
        })
        .finally(() => setLoading(false));
    }
  }, [active]);

  // === Cargar categorías y marcas ===
  useEffect(() => {
    CatalogApi.listCategories().then((res) => setCategories(res.data));
    CatalogApi.listBrands().then((res) => setBrands(res.data));
  }, []);

  // === Crear o editar producto ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.categoryId || !form.brandId || !form.nombre || !form.precioBase) {
        alert("Completa todos los campos obligatorios.");
        return;
      }

      const payload = {
        categoryId: form.categoryId,
        brandId: form.brandId,
        name: form.nombre,
        description: form.descripcion,
        basePrice: Number(form.precioBase),
      };

      if (editing) {
  await CatalogApi.updateProduct(editing.id, payload);
  alert("Producto actualizado correctamente");
} else {
  if (!form.categoryId || !form.brandId) {
    alert("Selecciona una categoría y una marca válidas antes de crear el producto.");
    return; // <- este return debe estar dentro del if
  }

  await CatalogApi.createProduct(payload);
  alert("Producto creado correctamente");
}


      setShowForm(false);
      setEditing(null);
      setForm({
        nombre: "",
        descripcion: "",
        categoryId: 0,
        brandId: 0,
        precioBase: "",
      });

      const res = await CatalogApi.listProducts();
      setProducts(res.data.results || res.data || []);
    } catch (err: unknown) {
      console.error("Error en creación/edición:", err);
      const axiosErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const msg =
        axiosErr.response?.data?.message ||
        axiosErr.response?.data?.error ||
        axiosErr.message ||
        "Error desconocido al crear/editar producto";
      alert(msg);
    }
  };

  // === Abrir modal en modo edición ===
  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({
      nombre: p.name,
      descripcion: p.description ?? "",
      categoryId: p.category?.id ?? 0,
      brandId: p.brand?.id ?? 0,
      precioBase: p.basePrice.toString(),
    });
    setShowForm(true);
  };

  // === Menú lateral ===
  const menu = [
    { id: "inicio", label: "Inicio", icon: <LayoutDashboard size={18} /> },
    { id: "products", label: "Productos", icon: <Package size={18} /> },
    { id: "users", label: "Usuarios", icon: <Users size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-[#212121] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] flex flex-col">
        <div className="p-6 border-b border-[#333]">
          <h1 className="text-2xl font-semibold text-[#D32F2F]">RedThread</h1>
          <p className="text-sm text-[#9E9E9E]">Panel Admin</p>
        </div>

        <nav className="flex-1 mt-4">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-colors ${
                active === item.id
                  ? "bg-[#D32F2F] text-white"
                  : "text-[#9E9E9E] hover:bg-[#2A2A2A]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-6 py-3 mt-auto mb-4 text-[#9E9E9E] hover:bg-[#2A2A2A] transition-colors">
          <LogOut size={18} />
          Salir
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 bg-[#212121] overflow-y-auto">
        {active === "inicio" && (
          <div className="text-center mt-20">
            <h2 className="text-4xl font-bold mb-4">Bienvenido Administrador</h2>
            <p className="text-[#9E9E9E] text-lg">
              Accede al panel de control para gestionar productos, usuarios y órdenes.
            </p>
          </div>
        )}

        {active === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Gestión de Productos</h2>
              <button
                onClick={() => navigate("/product-wizard")}
                className="flex items-center gap-2 bg-[#D32F2F] hover:bg-[#b71c1c] px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} /> Nuevo producto
              </button>
            </div>

            {loading ? (
              <p className="text-[#9E9E9E]">Cargando productos...</p>
            ) : (
              <div className="overflow-x-auto">
                {products.length === 0 ? (
                  <p className="text-[#9E9E9E] text-center py-6">
                    No hay productos registrados.
                  </p>
                ) : (
                  <table className="w-full bg-[#1A1A1A] rounded-lg">
                    <thead>
                      <tr className="bg-[#121212]">
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Categoría</th>
                        <th className="p-3 text-left">Precio</th>
                        <th className="p-3 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b border-[#333]">
                          <td className="p-3">{p.name}</td>
                          <td className="p-3">{p.category?.name ?? "Sin categoría"}</td>
                          <td className="p-3">
                            ${p.basePrice?.toLocaleString("es-CL")}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleEdit(p)}
                              className="bg-[#D32F2F] hover:bg-[#9E9E9E] text-white px-3 py-1 rounded flex items-center gap-2 mx-auto transition"
                            >
                              <Pencil size={14} /> Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal crear/editar producto */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-2xl w-[400px]">
            <h3 className="text-xl font-semibold mb-4">
              {editing ? "Editar producto" : "Nuevo producto"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-sm text-white font-medium">
                Nombre
                <input
                  placeholder="Nombre del producto"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="mt-1 bg-[#1A1A1A] border border-[#444] p-2 rounded text-white w-full"
                />
              </label>

              <label className="text-sm text-white font-medium">
                Descripción
                <input
                  placeholder="Descripción breve"
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                  className="mt-1 bg-[#1A1A1A] border border-[#444] p-2 rounded text-white w-full"
                />
              </label>

              <label className="text-sm text-white font-medium">
                Categoría
                <select
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      categoryId: Number(e.target.value),
                    })
                  }
                  className="mt-1 bg-[#1A1A1A] border border-[#444] p-2 rounded text-white w-full"
                >
                  <option value={0}>Selecciona una categoría</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm text-white font-medium">
                Marca
                <select
                  value={form.brandId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      brandId: Number(e.target.value),
                    })
                  }
                  className="mt-1 bg-[#1A1A1A] border border-[#444] p-2 rounded text-white w-full"
                >
                  <option value={0}>Selecciona una marca</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm text-white font-medium">
                Precio
                <input
                  placeholder="Precio base"
                  type="number"
                  value={form.precioBase}
                  onChange={(e) =>
                    setForm({ ...form, precioBase: e.target.value })
                  }
                  className="mt-1 bg-[#1A1A1A] border border-[#444] p-2 rounded text-white w-full"
                />
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="text-[#D32F2F]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#D32F2F] hover:bg-[#b71c1c] px-4 py-2 rounded text-white"
                >
                  {editing ? "Guardar cambios" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
