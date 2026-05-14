import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/common/ScrollToTop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Al Wafa Fruits | Premium Fresh Fruits Supplier in Dubai",
    template: "%s | Al Wafa Fruits",
  },
  description:
    "Al Wafa Fruits - Premium quality fresh fruits supplier in Dubai, UAE. We deliver the finest fruits with exceptional service across the UAE.",
  
  keywords: [
    "Al Wafa Fruits",
    "Fresh Fruits Dubai",
    "Fruit Supplier Dubai",
    "Premium Fruits UAE",
    "Best Fruits in Dubai",
    "Fruit Wholesaler Dubai",
    "Organic Fruits Dubai",
  ],

  authors: [{ name: "Al Wafa Fruits" }],
  creator: "Al Wafa Fruits",

  openGraph: {
    title: "Al Wafa Fruits | Premium Fresh Fruits in Dubai",
    description:
      "Premium quality fruits supplier based in Business Bay, Dubai. Fast delivery and exceptional service.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Al Wafa Fruits",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Al Wafa Fruits",
  },

 
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://alwafafruits.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        <Navbar />
         {/* ← Put Toaster here – appears on top of everything */}
        <Toaster
          position="top-center" // or "top-right", "bottom-right", etc.
          toastOptions={{
            duration: 5000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              maxWidth: "500px",
            },
            success: {
              style: {
                background: "#10b981", // green
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "#10b981",
              },
            },
            error: {
              style: {
                background: "#ef4444", // red
                color: "white",
              },
            },
          }}
        />
        {children}
        <Footer />
        <ScrollToTop />
        </body>
    </html>
  );
}
