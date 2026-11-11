import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "M. Daffa Badranthoriq | Full Stack Software Engineer",
    short_name: "Daffa Badranthoriq",
    description:
      "Full Stack Software Engineer in Jakarta building with Next.js, TypeScript and Golang, plus AI and LLM applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3EEE3",
    theme_color: "#D9541E",
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
