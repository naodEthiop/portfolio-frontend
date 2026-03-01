import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/home-page";
import { AdminLoginPage } from "@/pages/admin-login-page";
import { DashboardClient } from "@/components/admin/dashboard-client";
import { readAdminToken } from "@/lib/auth/token";

function AdminIndex() {
  const token = readAdminToken();
  return <Navigate to={token ? "/admin/dashboard" : "/admin/login"} replace />;
}

export default function App() {
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
