import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Variable } from "lucide-react";
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet-Fusion",
  description: "Video Calling Platform",
  icons: {
    icon: "/icons/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        variables: {
          colorText: "#fff",
          colorBackground: "#1c1f2e",
          colorPrimary:"#0E78F9",
          colorInputBackground:"#252a41",
          colorInputText:"#fff",
        },
        layout: {
          logoImageUrl:'icons/yoom-logo.svg',
          socialButtonsVariant:'iconButton'
        }
      }
      }>
      <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster />
        </body>
    </ClerkProvider>
    </html>
  );
}
