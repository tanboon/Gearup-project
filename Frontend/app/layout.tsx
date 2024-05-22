import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../libs/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="relative">
        <NextAuthProvider session={nextAuthSession}>
          <Navbar />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
