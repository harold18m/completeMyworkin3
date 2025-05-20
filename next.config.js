/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/analizar-cv',
        destination: 'https://api-cv-myworkin.onrender.com/analizar-cv/',
      },
    ];
  },
}

module.exports = nextConfig 