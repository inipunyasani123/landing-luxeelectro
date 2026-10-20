import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUK, SITE, produkBySlug, rp } from '@/lib/produk';
import PanelSpek from '../../components/PanelSpek';
import Kurva from '../../components/Kurva';

/* Deskripsi meta maksimal 155 karakter: dipotong di akhir kalimat bila bisa, kalau tidak di batas kata. */
const ringkas = (t, n = 155) => {
  if (t.length <= n) return t;
  const titik = t.lastIndexOf('. ', n - 1);
  return titik > 80 ? t.slice(0, titik + 1) : `${t.slice(0, t.lastIndexOf(' ', n - 1))}…`;
};

export function generateStaticParams() {
  return PRODUK.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = produkBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.nama} — ${p.kategori}`,
    description: ringkas(`Lembar spesifikasi ${p.nama} (${p.kategori.toLowerCase()}): ${p.ringkas} Respons ${p.spek.respons}, berat ${p.spek.berat}.`),
    alternates: { canonical: `${SITE}/produk/${p.slug}` },
  };
}

export default async function Produk({ params }) {
  const { slug } = await params;
  const p = produkBySlug(slug);
  if (!p) notFound();
  const lain = PRODUK.filter((x) => x.slug !== p.slug);
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.nama, image: `${SITE}/images/produk/${p.slug}.webp`, category: p.kategori, description: p.ringkas, brand: { '@type': 'Brand', name: 'Luxe' }, offers: { '@type': 'Offer', price: p.harga, priceCurrency: 'IDR' } };

  return (
    <main className="bg-slate-deep pt-16 text-lume">
      <header className="px-6 pt-12 pb-14 md:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <p className="spec-label text-violet-light"><Link href="/#lini" className="hover:underline">Lini Luxe</Link> · {p.kategori}</p>
            <h1 className="mt-4 text-5xl font-extrabold text-lume md:text-7xl">{p.nama}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-lume/85">{p.ringkas}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <p className="spec-num text-3xl text-lume">{rp(p.harga)}</p>
              <Link href={`/?produk=${p.slug}#pesan`} className="inline-flex bg-violet-spec px-6 py-3.5 font-bold text-white hover:bg-violet-spec-2">Pesan uji dengar</Link>
            </div>
          </div>
          <figure className="order-first lg:order-none">
            <Image src={`/images/produk/${p.slug}.webp`} alt={p.gambar} width={1200} height={900} priority sizes="(min-width: 1152px) 37rem, (min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] h-auto w-full border border-lume/10 object-cover" />
            <figcaption className="spec-label mt-3 text-lume/70">Ilustrasi produk · bukan foto</figcaption>
          </figure>
        </div>
      </header>

      <section aria-labelledby="spek" className="bg-slate-deep-2 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 id="spek" className="spec-label mb-5 text-violet-light">Panel spesifikasi</h2>
            <PanelSpek spek={p.spek} />
          </div>
          <div>
            {p.kurva ? (
              <>
                <h2 className="spec-label mb-5 text-violet-light">Respons frekuensi</h2>
                <div className="border border-lume/12 p-6"><Kurva seri={[p]} judul={`Kurva respons frekuensi ${p.nama}`} /></div>
              </>
            ) : (
              <>
                <h2 className="spec-label mb-5 text-violet-light">Untuk perangkat mana</h2>
                <p className="border border-lume/12 p-6 leading-relaxed text-lume/85">{p.nama} tidak punya kurva respons sendiri — ia meneruskan sinyal serata mungkin (±0,5 dB). Yang berubah adalah daya dan kebersihan sinyal ke headphone Anda.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="spec-label mb-5 text-violet-light">Cocok untuk</h2>
            <ul className="space-y-3">{p.cocok.map((c) => <li key={c} className="flex gap-3 text-lg"><span aria-hidden="true" className="mt-2.5 h-1.5 w-4 shrink-0 bg-violet-light" />{c}</li>)}</ul>
          </div>
          <div>
            <h2 className="spec-label mb-5 text-violet-light">Isi kotak</h2>
            <ol className="space-y-2">{p.kotak.map((k, i) => <li key={k} className="flex gap-3 border-b border-lume/10 pb-2"><span className="spec-num text-violet-light">{String(i + 1).padStart(2, '0')}</span>{k}</li>)}</ol>
          </div>
        </div>
      </section>

      <nav aria-label="Perangkat lain" className="border-t border-lume/10 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="spec-label text-violet-light">Perangkat lain</p>
            <Link href={`/bandingkan?a=${p.slug}&b=${lain[0].slug}`} className="spec-label border-b border-violet-light pb-1 text-violet-light">Bandingkan {p.nama} dengan {lain[0].nama}</Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {lain.map((x) => (
              <li key={x.slug}>
                <Link href={`/produk/${x.slug}`} className="flex items-center gap-4 border border-lume/12 p-5 hover:border-violet-light">
                  <Image src={`/images/produk/${x.slug}.webp`} alt="" width={96} height={72} className="h-14 w-[4.7rem] shrink-0 object-cover" />
                  <span><span className="block font-bold">{x.nama}</span><span className="text-sm text-lume/80">{x.kategori}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </main>
  );
}
