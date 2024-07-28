// App.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { About } from "./page/about/about";
import Admin from "./page/admin/admin";
import { LayoutAdmin } from "./page/admin/components/layout";
import AdminCursos from "./page/admin/view/admin-cursos/admin-curso";
import Docente from "./page/admin/view/docente/docente";
import { Cursos } from "./page/curso/curso";
import { LayoutPublic } from "./page/home/components/layout";
import { Home } from "./page/home/home";
import { Login } from "./page/login/login";
import { Register } from "./page/register/register";
import Reporte from "./page/report/report";
import { Unauthorized } from "./page/unauthorization/route";
import { User } from "./page/usuario/user";
import { ProtectedRoute } from "./protected/route";
import Provider from "./provider";
import { supabase } from "./server";
import { useAuthStore } from "./store/auth";
import { LayoutUser } from "./page/usuario/layout";

const fetchUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("role")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
  return data.role;
};

const App: React.FC = () => {
  const setAuth = useAuthStore((state: any) => state.setAuth);
  const auth = useAuthStore((state: any) => state.auth);
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User is signed in");
        if (session) {
          fetchUserRole(session.user.id).then((role) => {
            if (!role) {
              return;
            }
            setAuth({ id: session.user.id, role });
          });
        }
      } else if (event === "SIGNED_OUT") {
        setAuth({ id: "", role: "" });
      } else if (event === "INITIAL_SESSION") {
        if (session) {
          if (!auth) {
            fetchUserRole(session.user.id).then((role) => {
              if (!role) {
                return;
              }
              setAuth({ id: session.user.id, role });
            });
          }
        }
      }
    });
  }, []);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RoutePublic />} />
          <Route
            path="/admin/*"
            element={<ProtectedRoute allowedRoles={["admin"]} />}
          >
            <Route path="*" element={<RouterAdmin />} />
          </Route>
          <Route
            path="/user/*"
            element={<ProtectedRoute allowedRoles={["user"]} />}
          >
            <Route path="*" element={<RouteUsuario />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
const RouteUsuario = () => {
  return (
    <LayoutUser>
      <Routes>
        <Route index element={<User />} />
      </Routes>
    </LayoutUser>
  );
};

const RoutePublic = () => {
  return (
    <LayoutPublic>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/curso" element={<Cursos />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </LayoutPublic>
  );
};

export const RouterAdmin = () => {
  return (
    <LayoutAdmin>
      <Routes>
        <Route index element={<Admin />} />
        <Route path="curso" element={<AdminCursos />} />
        <Route path="report" element={<Reporte />} />
        <Route path="horario" element={<Navigate to={"/horario"} />} />
        <Route path="docente" element={<Docente />} />
      </Routes>
    </LayoutAdmin>
  );
};

export default App;
