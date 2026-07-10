import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "M. Daffa Badranthoriq — Full Stack Engineer",
    short_name: "Daffa Badranthoriq",
    description:
      "Full Stack Engineer specializing in scalable web infrastructure, distributed systems, and high-performance applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    icons: [
      { src: "/android-icon-36x36.png", sizes: "36x36", type: "image/png" },
      { src: "/android-icon-48x48.png", sizes: "48x48", type: "image/png" },
      { src: "/android-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { src: "/android-icon-96x96.png", sizes: "96x96", type: "image/png" },
      { src: "/android-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { src: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
