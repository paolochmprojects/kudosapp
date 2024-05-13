import type { Metadata } from "next";
import { Delicious_Handrawn } from "next/font/google";
import clsx from "clsx"
import "./globals.css";

const inter = Delicious_Handrawn({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Kudos - Sistema de Carga de datos",
  description: "Sistema de Carga de datos desde csv para registrar usuarios mediante csv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={clsx(inter.className, "flex p-8 min-h-screen")}>
        <div className="flex-grow border-2 border-black">
          {children}
        </div>
      </body>
    </html>
  );
}
