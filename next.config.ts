import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {

  output: "export",
   async rewrites() {
    return [
      {
        source: '/', // the URL you want in browser
        destination: '/signin',   // actual page under /pages/index.tsx
      },
     ];
  },
  // Explicitly set the workspace root to avoid "multiple lockfiles" warning
  // Adjust this if your real monorepo root is different.
  outputFileTracingRoot: path.join(__dirname),

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config: any) => {
    // Keep ignored warnings (do not force memory cache — it breaks vendor-chunks on disk in dev)
    config.ignoreWarnings = [
      {
        module: /customStyle\.scss/,
      },
      {
        message: /No serializer registered for Warning/,
      },
    ];

    return config;
 
  },
};

export default nextConfig;
