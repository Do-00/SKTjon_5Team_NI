import type { NextConfig } from "next";

/** Energy-grade backend. Override with `API_ORIGIN` in `.env.local`. */
const API_ORIGIN = process.env.API_ORIGIN ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  // Proxy the backend through the dev server so the browser calls same-origin
  // `/api/*` (no CORS). Only these paths are forwarded; `/api/login` etc. stay
  // on MSW.
  async rewrites() {
    return [
      { source: "/api/match", destination: `${API_ORIGIN}/api/match` },
      { source: "/api/report", destination: `${API_ORIGIN}/api/report` },
    ];
  },
};

export default nextConfig;
