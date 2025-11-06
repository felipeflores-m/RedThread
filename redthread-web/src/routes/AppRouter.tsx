import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* ÚNICO NAVBAR */}
        <Navbar />

        <main className="flex-1 px-4 md:px-6 lg:px-8 pt-0 pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* ÚNICO FOOTER */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
