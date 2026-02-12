/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Legacy redirects to Spanish equivalents with language prefix
      {
        source: '/events',
        destination: '/es/eventos',
        permanent: true, // 301 redirect
      },
      {
        source: '/que-es-nosework-trial',
        destination: '/es/que-es-nosework-trial',
        permanent: true, // 301 redirect
      },
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
