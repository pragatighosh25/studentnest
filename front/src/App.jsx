import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PGList from "./pages/PGList";
import PGDetail from "./pages/PGDetail";
import Login from "./pages/owner/Login";
import Dashboard from "./pages/owner/Dashboard";
import ProtectedOwnerRoute from "./routes/ProtectedOwnerRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

function AnalyticsTracker() {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId) return;

    // Load Google Analytics script if not already added
    if (!window.gtag) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
    }

    // Log the page view
    window.gtag("config", gaId, {
      page_path: location.pathname + location.search,
    });
  }, [location, gaId]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pgs" element={<PGList />} />
        <Route path="/pg/:id" element={<PGDetail />} />
        <Route path="/owner/login" element={<Login />} />
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
