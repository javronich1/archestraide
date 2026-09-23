/** @type {import('next').NextConfig} */

// Normal builds include the optional /api/ask server route.
// build:static temporarily excludes that route and exports browser-only pages.
// BASE_PATH supports deployment below a project URL such as /archestraide/.
const isStatic = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
        basePath: basePath || undefined,
        env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: "true" },
      }
    : {}),
};

export default nextConfig;
