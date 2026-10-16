'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  ['/#spesifikasi', 'Spesifikasi'],
  ['/#lini', 'Lini Luxe'],
  ['/bandingkan', 'Bandingkan'],
  ['/#perlindungan', 'Perlindungan'],
];

/* Navigasi utama + menu ponsel. Di ponsel panelnya berupa panel spesifikasi: sel-sel bergaris tipis seperti alat ukur, kode kanal ungu di kiri tiap tautan.
   Menu tertutup sendiri saat pindah halaman, menekan Escape (fokus kembali ke
   tombol), atau mengetuk di luar panel. */
export default function Navigasi({ children }) {
  const path = usePathname();
  const [buka, setBuka] = useState(false);
  const tombol = useRef(null);
  const panel = useRef(null);

  useEffect(() => setBuka(false), [path]);

  useEffect(() => {
    if (!buka) return undefined;
    const tutup = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'pointerdown' && (panel.current?.contains(e.target) || tombol.current?.contains(e.target))) return;
      setBuka(false);
      if (e.type === 'keydown') tombol.current?.focus();
    };
    document.addEventListener('keydown', tutup);
    document.addEventListener('pointerdown', tutup);
    return () => {
      document.removeEventListener('keydown', tutup);
      document.removeEventListener('pointerdown', tutup);
    };
  }, [buka]);

  const aktif = (href) => (!href.includes('#') && href !== '/' && path.startsWith(href) ? 'page' : undefined);

  return (
    <>
      <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={aktif(href)} className="spec-label text-lume/80 hover:text-lume aria-[current=page]:text-violet-light">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {children}
        <button
          ref={tombol}
          type="button"
          aria-expanded={buka}
          aria-controls="menu-ponsel"
          onClick={() => setBuka((b) => !b)}
          className="spec-label inline-flex h-10 min-w-[4.75rem] items-center justify-center border border-lume/30 px-3 text-lume md:hidden"
        >
          {buka ? 'Tutup' : 'Menu'}
        </button>
      </div>
      <nav id="menu-ponsel" ref={panel} aria-label="Navigasi ponsel" hidden={!buka} className="absolute inset-x-0 top-full border-b border-lume/12 bg-slate-deep shadow-[0_24px_40px_-20px_rgb(0_0_0/0.7)] md:hidden">
        <ol className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-lume/12">
          {NAV.map(([href, label], i) => (
            <li key={href} className="bg-slate-deep-2">
              <Link href={href} onClick={() => setBuka(false)} aria-current={aktif(href)} className="flex min-h-16 flex-col justify-center gap-1 px-5 py-3 text-lume aria-[current=page]:text-violet-light">
                <span className="spec-label text-violet-light">CH-0{i + 1}</span>
                <span className="font-[family-name:var(--font-manrope)] text-base font-extrabold">{label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
