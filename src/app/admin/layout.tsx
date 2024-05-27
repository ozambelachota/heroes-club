import { ReactNode } from "react";
import { NavbarAdmin } from "./components/navbar-admin.component";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavbarAdmin />
      {children}
    </div>
  );
}
