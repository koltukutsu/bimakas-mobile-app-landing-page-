import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "Cal AI - AI-Powered Calorie Training App",
  description: "Track your calories with just a picture using Cal AI. AI-powered app for easy calorie tracking with instant nutritional information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}