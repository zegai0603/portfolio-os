import type { NextConfig } from "next";

// Pages from the old terminal site, so old links still land somewhere.
const OLD_PAGES = ["/code/:path*", "/frontend/:path*", "/preview", "/projects", "/skills", "/contact", "/intro", "/readme", "/blog"];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return OLD_PAGES.map((source) => ({ source, destination: "/", permanent: true }));
  },
};

export default nextConfig;
