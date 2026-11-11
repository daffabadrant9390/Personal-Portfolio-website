/**
 * Public asset URLs for images served from Cloudflare R2.
 *
 * Each environment (staging, production) has its own bucket with its own public
 * URL, and the deployment picks one through NEXT_PUBLIC_ASSETS_BASE_URL:
 *
 *   staging    NEXT_PUBLIC_ASSETS_BASE_URL=https://staging-assets.daffabadranthoriq.com
 *   production NEXT_PUBLIC_ASSETS_BASE_URL=https://assets.daffabadranthoriq.com
 *
 * Object keys are identical in both buckets, so the same code works everywhere.
 * When the variable is empty (local dev, tests) the path is returned untouched
 * and Next serves the file from /public instead.
 *
 * NEXT_PUBLIC_ values are inlined at build time, so staging and production must
 * each be built with their own value. The base URL is public, so it is not a secret.
 */
export function getAssetsBaseUrl(
  // Must be the literal `process.env.NEXT_PUBLIC_ASSETS_BASE_URL`: Next only
  // inlines it into the browser bundle when written this way, not via `env[...]`.
  env: Record<string, string | undefined> = {
    NEXT_PUBLIC_ASSETS_BASE_URL: process.env.NEXT_PUBLIC_ASSETS_BASE_URL,
  },
): string {
  return (env.NEXT_PUBLIC_ASSETS_BASE_URL ?? "").trim().replace(/\/+$/, "");
}

export function assetUrl(path: string, baseUrl: string = getAssetsBaseUrl()): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return baseUrl ? `${baseUrl}${normalized}` : normalized;
}
