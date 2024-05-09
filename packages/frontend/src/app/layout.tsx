import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import NavbarItem from "./navbar-item";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cuentas Claras App",
  description: "Aplicación de control de gastos personales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbar: NavbarItem[] = [
    {
      name: "Inicio",
      href: "/",
    } as NavbarItem,
    {
      name: "Crear Grupo",
      href: "/group",
    } as NavbarItem,
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul>
            {navbar.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <main>{children}</main>
        <Suspense></Suspense>
      </body>
    </html>
  );
}