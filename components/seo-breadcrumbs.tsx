import Link from 'next/link';

export function SeoBreadcrumbs({ current }: { current: string }) {
  return <nav className="seo-breadcrumbs" aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>;
}
