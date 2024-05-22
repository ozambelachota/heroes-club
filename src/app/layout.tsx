import QueryProvider from "@/components/query-provider";
import { ThemeProviderRoot } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heroes club academia",
  description: "academia de reforzamiento para estudiantes de todas las edades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderRoot>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProviderRoot>
      </body>
    </html>
  );
}
