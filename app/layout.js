import { Manrope, Inter } from "next/font/google";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const __jsonld = {"@context":"https://schema.org","@type":"Store","name":"LuxeElectro","description":"Toko audio pribadi dengan lini produk Luxe","url":"https://landing-luxeelectro.pintuweb.id"};

const DESKRIPSI = "LuxeElectro: headphone, earphone, DAC, dan speaker meja lini Luxe dengan spesifikasi lengkap, kurva respons frekuensi, dan uji dengar 14 hari di rumah.";

export const metadata = {
  metadataBase: new URL("https://landing-luxeelectro.pintuweb.id"),
  title: { default: "LuxeElectro — Audio dengan Spesifikasi yang Ditulis Lengkap", template: "%s — LuxeElectro" },
  description: DESKRIPSI,
  applicationName: "LuxeElectro",
  keywords: ["headphone tertutup", "earphone in-ear", "DAC portabel", "speaker meja aktif", "kurva respons frekuensi"],
  authors: [{ name: "LuxeElectro" }],
  creator: "LuxeElectro",
  publisher: "LuxeElectro",
  alternates: { canonical: "https://landing-luxeelectro.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landing-luxeelectro.pintuweb.id",
    siteName: "LuxeElectro",
    title: "LuxeElectro — Audio dengan Spesifikasi yang Ditulis Lengkap",
    description: DESKRIPSI,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LuxeElectro — Audio dengan Spesifikasi yang Ditulis Lengkap" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeElectro — Audio dengan Spesifikasi yang Ditulis Lengkap",
    description: DESKRIPSI,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-violet-spec focus:px-4 focus:py-2 focus:text-white">Lompat ke konten</a>
        <SiteHeader />
        <div id="konten">{children}</div>
        <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=luxeelectro" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
        </body>
    </html>
  );
}
