/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    // Para Firebase Admin SDK
    if (isServer) {
      config.externals.push({
        'firebase-admin': 'commonjs firebase-admin',
      });
    }
    return config;
  },
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