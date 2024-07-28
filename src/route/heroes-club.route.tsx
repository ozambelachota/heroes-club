import { Route, Routes } from "react-router-dom";
import Admin from "../page/admin/admin";
import { User } from "../page/usuario/user";
import { ProtectedRoute } from "../protected/route";

export const RouteHeroesClub: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={<ProtectedRoute allowedRoles={["admin"]} />}
      >
        <Route index element={<Admin />} />
      </Route>
      <Route
        path="/usuario/*"
        element={<ProtectedRoute allowedRoles={["user"]} />}
      >
        <Route index element={<User />} />
      </Route>
      <Route path="*" element={<h1>no tienes acceso</h1>} />
    </Routes>
  );
};
