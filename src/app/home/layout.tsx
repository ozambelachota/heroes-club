import { NavbarPublic } from "@/components/navbar.components";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarPublic />
      {children}
    </div>
  );
}
