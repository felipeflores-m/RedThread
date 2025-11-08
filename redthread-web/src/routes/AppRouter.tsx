import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminVista from "../pages/AdminVista";
import ProductWizard from "@/pages/ProductWizard";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail"; // 👈 nuevo

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 px-4 md:px-6 lg:px-8 pt-0 pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminVista />} />
            <Route path="/product-wizard" element={<ProductWizard />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* 👈 */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
