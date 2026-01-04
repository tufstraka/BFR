import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Biased Film Review | Honest Entertainment Reviews",
    template: "%s | Biased Film Review",
  },
  description:
    "Your source for honest, thoughtful opinions on movies, TV shows, books, and games. Discover reviews that matter.",
  keywords: [
    "movie reviews",
    "film reviews",
    "TV show reviews",
    "book reviews",
    "game reviews",
    "entertainment",
    "biased film review",
  ],
  authors: [{ name: "Keith Kadima" }],
  creator: "Keith Kadima",
  publisher: "Biased Film Review",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://biasedfilmreview.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Biased Film Review",
    title: "Biased Film Review | Honest Entertainment Reviews",
    description:
      "Your source for honest, thoughtful opinions on movies, TV shows, books, and games.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Biased Film Review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biased Film Review",
    description: "Honest entertainment reviews that matter.",
    images: ["/og-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ToastProvider />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}