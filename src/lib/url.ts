// With build.format 'file', Astro.url.pathname can end in .html at build time.
// Normalise it so canonicals and "current page" checks match the live URLs.
export const cleanPath = (pathname: string): string => {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  return p === '' ? '/' : p;
};

export const isCurrent = (current: string, href: string): boolean =>
  href === '/' ? current === '/' : current === href || current.startsWith(`${href}/`);
