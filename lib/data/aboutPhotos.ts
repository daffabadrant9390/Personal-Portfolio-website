import { assetUrl, getAssetsBaseUrl } from "@/lib/assets";

/**
 * Photos for the About page, stored in the R2 bucket under assets/. To add one,
 * upload about-us-carousel-N.jpeg to both buckets and add N here.
 */
const PHOTO_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface AboutPhoto {
  src: string;
  alt: string;
}

// Without NEXT_PUBLIC_ASSETS_BASE_URL (plain `next dev`) the R2 photos do not
// exist under /public and every request would 404, so reuse the local photo for
// each slot. The carousel keeps all its slides.
const useLocalFallback = getAssetsBaseUrl() === "" && process.env.NODE_ENV === "development";

export const aboutPhotos: AboutPhoto[] = PHOTO_NUMBERS.map((n, i) => ({
  src: useLocalFallback
    ? "/assets/about-us-page-image.jpeg"
    : assetUrl(`/assets/about-us-carousel-${n}.jpeg`),
  alt: `Photo ${i + 1} of ${PHOTO_NUMBERS.length} in Daffa's gallery`,
}));
