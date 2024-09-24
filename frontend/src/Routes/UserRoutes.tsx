import { Route, Routes } from "react-router-dom";
import UserLogin from "../Pages/UserLogin";
import UserDashboard from "../Pages/UserDashboard";
import UserSignUp from "../Pages/UserSignUp";
import UserProtect from "../Middlewares/UserProtect";

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserProtect>
            <UserDashboard />
          </UserProtect>
        }
      />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignUp />} />
    </Routes>
  );
}
