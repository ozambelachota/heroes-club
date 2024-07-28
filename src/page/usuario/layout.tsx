import React from "react";
import NavbarUser from "./components/navbar-user.component";

export const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <nav>
        <NavbarUser />
      </nav>
      <div>{children}</div>
    </div>
  );
};
