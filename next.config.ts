import path from "path";

const isDev = process.env.NODE_ENV === "development";
const backendProxyTarget =
  process.env.BACKEND_PROXY_TARGET || "http://localhost:8002";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only for production builds (Docker/nginx). Omit in dev so
  // rewrites work without the export-no-custom-routes warning.
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),

  async rewrites() {
    const routes: Array<{ source: string; destination: string }> = [
      {
        source: "/",
        destination: "/signin",
      },
    ];

    if (isDev) {
      const proxy = (source: string, targetPath: string) => ({
        source,
        destination: `${backendProxyTarget}${targetPath}`,
      });

      routes.push(
        proxy("/api/:path*", "/api/:path*"),
        proxy("/media/:path*", "/media/:path*"),
        proxy("/admin/:path*", "/admin/:path*"),
        proxy("/ws/:path*", "/ws/:path*"),
        proxy("/iclock/:path*", "/iclock/:path*"),
        proxy("/cdata", "/cdata"),
        proxy("/getrequest", "/getrequest"),
        proxy("/devicecmd", "/devicecmd"),
      );
    }

    return routes;
  },

  // Explicitly set the workspace root to avoid "multiple lockfiles" warning
  outputFileTracingRoot: path.join(__dirname),

  eslint: {
    ignoreDuringBuilds: true,
  },

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

  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        jquery: path.resolve(__dirname, "src/lib/jquery-ssr-stub.js"),
      };
    }

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
