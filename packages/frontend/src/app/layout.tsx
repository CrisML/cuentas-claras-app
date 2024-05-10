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

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Suspense></Suspense>
      </body>
    </html>
  );
}