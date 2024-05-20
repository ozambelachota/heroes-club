import { NavbarPublic } from "@/components/navbar.components";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-background">
      <NavbarPublic />
      {children}
    </div>
  );
}
