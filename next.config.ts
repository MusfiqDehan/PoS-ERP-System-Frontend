import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Self-contained Node server build for Docker/VPS deployment. Produces
  // `.next/standalone/server.js` (run with `node server.js`). Supports SSR,
  // middleware, auth, and subdomain routing — unlike the old static export.
  output: "standalone",
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

  // Speeds up dev compilation by importing only the used members of these large
  // barrel-export packages instead of their entire index (fewer modules to
  // compile per route). Safe: it only changes how imports are resolved.
  experimental: {
    optimizePackageImports: [
      "react-feather",
      "@tabler/icons-react",
      "react-bootstrap",
      "primereact",
      "@fortawesome/react-fontawesome",
      "react-apexcharts",
      "apexcharts",
      "antd",
    ],
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
