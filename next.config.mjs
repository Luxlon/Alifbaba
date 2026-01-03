/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // Fix for pdfjs-dist canvas dependency
  webpack: (config, { isServer }) => {
    // Exclude canvas from client bundle (it's a Node.js only module)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      };
    }
    
    // Also exclude on server side
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas'];
    }
    
    return config;
  },
};

export default nextConfig;
