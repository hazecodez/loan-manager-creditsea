import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes/>}/>
        <Route path="/admin/*" element={<AdminRoutes/>} />
      </Routes>
    </Router>
  );
}
