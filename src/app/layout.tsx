import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My Dial — Horlogerie sur mesure",
    template: "%s | My Dial",
  },
  description:
    "My Dial crée des montres automatiques assemblées à la main en France. Découvrez la collection ou composez votre pièce unique dans le configurateur.",
  keywords: [
    "montre de luxe",
    "montre personnalisée",
    "horlogerie",
    "montre automatique",
    "My Dial",
  ],
  openGraph: {
    title: "My Dial — Horlogerie sur mesure",
    description:
      "Des montres automatiques assemblées à la main, à composer selon vos envies.",
    url: siteUrl,
    siteName: "My Dial",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/collection/bleu-imperial.png", width: 1000, height: 1000 }],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <CartProvider>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-none focus:bg-gold-500 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
          >
            Aller au contenu principal
          </a>
          <Header />
          <CartDrawer />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
