import React from "react";
import { NavbarUsuario } from "./components/navbar.usuario";

export default function UsuarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarUsuario />
      {children}
    </div>
  );
}
