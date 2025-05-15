import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@pages/login-page";
import { Typography } from "@mui/material";
import { HomePage } from "@pages/home";
import { Layout } from "@/components/template";
import { useSelector } from "react-redux";
import { RootState } from "@/state-managment/store";
import { ProvidersPage } from "@/pages/providers";
import { DashboardSales } from "@/pages/dashboardSales/dashboard-sales";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = user !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Typography>Products</Typography>
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/proveedores"
        element={
          <ProtectedRoute>
            <ProvidersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-sales"
        element={
          <ProtectedRoute>
            <DashboardSales />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
