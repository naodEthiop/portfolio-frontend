import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "@/pages/home-page";
import { AdminLoginPage } from "@/pages/admin-login-page";
import { DashboardClient } from "@/components/admin/dashboard-client";
import { readAdminToken } from "@/lib/auth/token";
import { useEffect } from "react";

function AdminIndex() {
  const token = readAdminToken();
  return <Navigate to={token ? "/admin/dashboard" : "/admin/login"} replace />;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const isAdmin = location.pathname === "/admin" || location.pathname.startsWith("/admin/");
    const href = isAdmin ? "/portfolio_favicon.png" : "/portfoliofav.png";

    let link = document.querySelector<HTMLLinkElement>("#app-favicon");
    if (!link) {
      link = document.createElement("link");
      link.id = "app-favicon";
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = href;
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminIndex />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardClient />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
