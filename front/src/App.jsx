import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PGList from "./pages/PGList";
import PGDetail from "./pages/PGDetail";
import Login from "./pages/owner/Login";
import Dashboard from "./pages/owner/Dashboard";
import ProtectedOwnerRoute from "./routes/ProtectedOwnerRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
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
