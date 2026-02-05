import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '../store/Provider/AuthProvider';

export const metadata: Metadata = {
  title: "Team Access Control Management",
  description: "Role based access control for teams built using Next.js and TypeScript.",
  keywords: ["team", "access control", "RBAC", "Next.js", "TypeScript"],
  authors: [{ name: "Divy Deshmukh", url: "https://yourwebsite.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
