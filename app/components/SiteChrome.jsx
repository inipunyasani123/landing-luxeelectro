import Link from 'next/link';
import Navigasi from './Navigasi';
import { PRODUK } from '@/lib/produk';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-lume/10 bg-slate-deep/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <Link href="/" className="inline-flex min-h-11 items-center font-[family-name:var(--font-manrope)] text-lg font-extrabold tracking-tight text-lume">
          Luxe<span className="text-violet-light">Electro</span>
        </Link>
        <Navigasi>
          <Link href="/#pesan" className="inline-flex h-11 items-center bg-violet-spec px-3 text-sm font-bold whitespace-nowrap text-white hover:bg-violet-spec-2 sm:px-4">
            Uji dengar<span className="hidden sm:inline">&nbsp;14 hari</span>
          </Link>
        </Navigasi>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-slate-deep px-6 text-lume">
      <div className="mx-auto grid max-w-6xl gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
        <div>
          <p className="font-[family-name:var(--font-manrope)] text-xl font-extrabold">Luxe<span className="text-violet-light">Electro</span></p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-lume/80">Audio pribadi dengan spesifikasi yang ditulis lengkap: headphone, earphone, DAC, dan speaker meja dari lini Luxe.</p>
        </div>
        <nav aria-label="Produk">
          <p className="spec-label mb-4 text-violet-light">Lembar spesifikasi</p>
          <ul className="space-y-0.5 text-sm text-lume/80">
            {PRODUK.map((p) => <li key={p.slug}><Link href={`/produk/${p.slug}`} className="inline-block py-3 hover:text-lume">{p.nama} · {p.kategori}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Halaman">
          <p className="spec-label mb-4 text-violet-light">Halaman</p>
          <ul className="space-y-0.5 text-sm text-lume/80">
            <li><Link href="/bandingkan" className="inline-block py-3 hover:text-lume">Bandingkan perangkat</Link></li>
            <li><Link href="/#perlindungan" className="inline-block py-3 hover:text-lume">Paket perlindungan</Link></li>
            <li><Link href="/#pesan" className="inline-block py-3 hover:text-lume">Pesan uji dengar</Link></li>
          </ul>
        </nav>
      </div>
      <p className="spec-label mx-auto max-w-6xl border-t border-lume/12 py-6 leading-[1.8] text-lume/70">
        © 2026 LuxeElectro · Produk, spesifikasi, dan harga adalah contoh untuk purwarupa desain. Foto: Corey Blaz dan kontributor Wikimedia Commons (CC0), lihat berkas sumber.
      </p>
    </footer>
  );
}
