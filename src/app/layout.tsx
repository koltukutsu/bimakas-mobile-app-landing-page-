import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "BiMakas - Anlık Güzellik ve Bakım Hizmetleri",
  description: "BiMakas ile lisanslı berber ve güzellik uzmanlarını bulunduğunuz yere çağırın. Anında rezervasyon, canlı takip ve salon kalitesi evinizde.",
  keywords: "mobil berber, evde güzellik hizmetleri, anlık bakım, güzellik uygulaması, mobil kuaför",
  authors: [{ name: "BiMakas" }],
  creator: "BiMakas",
  publisher: "BiMakas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bimakas.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "BiMakas - Anlık Güzellik ve Bakım Hizmetleri",
    description: "BiMakas ile lisanslı berber ve güzellik uzmanlarını bulunduğunuz yere çağırın. Anında rezervasyon, canlı takip ve salon kalitesi evinizde.",
    url: "https://bimakas.com",
    siteName: "BiMakas",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "BiMakas - Anlık Güzellik ve Bakım Hizmetleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BiMakas - Anlık Güzellik ve Bakım Hizmetleri",
    description: "BiMakas ile lisanslı berber ve güzellik uzmanlarını bulunduğunuz yere çağırın. Anında rezervasyon, canlı takip ve salon kalitesi evinizde.",
    images: ["/logo.png"],
    creator: "@bimakas_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}