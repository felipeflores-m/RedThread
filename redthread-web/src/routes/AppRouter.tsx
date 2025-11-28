import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminVista from "@/pages/AdminVista";
import ProductWizard from "@/pages/ProductWizard";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import CartPage from "@/pages/CartPage";

import AboutPage from "@/pages/AboutPage";
import CareersPage from "@/pages/CareersPage";
import PressPage from "@/pages/PressPage";
import OrderTrackingPage from "@/pages/OrderTrackingPage";
import ReturnsPage from "@/pages/ReturnsPage";
import SupportPage from "@/pages/SupportPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col text-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminVista />} />
            <Route path="/product-wizard" element={<ProductWizard />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Empresa */}
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route
              path="/trabaja-con-nosotros"
              element={<CareersPage />}
            />
            <Route path="/prensa" element={<PressPage />} />

            {/* Ayuda */}
            <Route
              path="/seguimiento-de-pedido"
              element={<OrderTrackingPage />}
            />
            <Route
              path="/cambios-y-devoluciones"
              element={<ReturnsPage />}
            />
            <Route path="/soporte" element={<SupportPage />} />

            {/* Legal */}
            <Route
              path="/terminos-y-condiciones"
              element={<TermsPage />}
            />
            <Route
              path="/politica-de-privacidad"
              element={<PrivacyPage />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
