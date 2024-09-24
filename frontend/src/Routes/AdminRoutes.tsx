import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";
import AdminLogin from "../Pages/AdminLogin";
import AdminProtect from "../Middlewares/AdminProtect";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminProtect>
            <AdminDashboard />
          </AdminProtect>
        }
      />
      <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
}
