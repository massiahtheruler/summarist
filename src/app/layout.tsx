import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthModal } from "@/components/AuthModal";
import { AuthProvider } from "@/context/AuthContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Read or listen to key ideas from popular books in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AuthProvider>
          <SubscriptionProvider>
            {children}
            <AuthModal />
          </SubscriptionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
