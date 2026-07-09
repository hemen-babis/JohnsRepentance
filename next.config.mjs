/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep pdfjs-dist out of the server bundle — it's browser-only
  serverExternalPackages: ["pdfjs-dist"],
  webpack: (config) => {
    // pdfjs-dist references canvas which is a native module — stub it on the server
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }
    return config
  },
}

export default nextConfig
