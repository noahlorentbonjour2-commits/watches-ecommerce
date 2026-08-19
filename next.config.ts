import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les visuels produits sont des PNG à fond transparent : on conserve
    // l'alpha en servant du WebP/AVIF plutôt que du JPEG.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
  },
};

export default nextConfig;
