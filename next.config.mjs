/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Prefijo /es obligatorio: rutas sin prefijo → 301 a /es/... (TASK-F1-020, routing-redirects-i18n-base)
      { source: '/events', destination: '/es/eventos', permanent: true },
      { source: '/eventos', destination: '/es/eventos', permanent: true },
      { source: '/que-es-nosework-trial', destination: '/es/que-es-nosework-trial', permanent: true },
      { source: '/about', destination: '/es/about', permanent: true },
      { source: '/reglamento', destination: '/es/reglamento', permanent: true },
      { source: '/como-empezar', destination: '/es/como-empezar', permanent: true },
      { source: '/contact', destination: '/es/contact', permanent: true },
      { source: '/normativas', destination: '/es/normativas', permanent: true },
      { source: '/community', destination: '/es/community', permanent: true },
      { source: '/join', destination: '/es/join', permanent: true },
      { source: '/clubs', destination: '/es/clubs', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Rewrites for root path with language prefixes
      {
        source: '/es',
        destination: '/',
      },
      {
        source: '/ca',
        destination: '/',
      },
      {
        source: '/es/',
        destination: '/',
      },
      {
        source: '/ca/',
        destination: '/',
      },
      // Rewrites for static pages with language prefixes
      {
        source: '/es/about',
        destination: '/about',
      },
      {
        source: '/ca/about',
        destination: '/about',
      },
      {
        source: '/es/eventos',
        destination: '/events',
      },
      {
        source: '/ca/eventos',
        destination: '/events',
      },
      {
        source: '/es/contact',
        destination: '/contact',
      },
      {
        source: '/ca/contact',
        destination: '/contact',
      },
      {
        source: '/es/que-es-nosework-trial',
        destination: '/que-es-nosework-trial',
      },
      {
        source: '/ca/que-es-nosework-trial',
        destination: '/que-es-nosework-trial',
      },
      {
        source: '/es/reglamento',
        destination: '/reglamento',
      },
      {
        source: '/ca/reglamento',
        destination: '/reglamento',
      },
      {
        source: '/es/como-empezar',
        destination: '/como-empezar',
      },
      {
        source: '/ca/como-empezar',
        destination: '/como-empezar',
      },
      {
        source: '/es/normativas',
        destination: '/normativas',
      },
      {
        source: '/ca/normativas',
        destination: '/normativas',
      },
      {
        source: '/es/community',
        destination: '/community',
      },
      {
        source: '/ca/community',
        destination: '/community',
      },
      {
        source: '/es/join',
        destination: '/join',
      },
      {
        source: '/ca/join',
        destination: '/join',
      },
      {
        source: '/es/clubs',
        destination: '/clubs',
      },
      {
        source: '/ca/clubs',
        destination: '/clubs',
      },
      // Rewrites for dynamic routes with language prefixes
      {
        source: '/es/eventos/:id',
        destination: '/events/:id',
      },
      {
        source: '/ca/eventos/:id',
        destination: '/events/:id',
      },
    ];
  },
};

export default nextConfig;
