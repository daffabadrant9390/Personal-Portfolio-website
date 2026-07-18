const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE_ICONS_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

interface IconEntry {
  url: string;
  /**
   * "dark"  = icon is a solid black/near-black mark — invisible on a dark card background,
   *           so it needs to be inverted (to white) in dark mode.
   * "light" = icon is a solid white mark — invisible on a light card background,
   *           so it needs to be inverted (to black) in light mode.
   * Omitted = full-color icon, safe on both.
   */
  tone?: "dark" | "light";
}

/** Keyed by a normalized (lowercase, alnum-only) tag name. */
const ICON_ENTRIES: Record<string, IconEntry> = {
  // Languages
  html5:            { url: `${DEVICON_BASE}/html5/html5-original.svg` },
  css3:             { url: `${DEVICON_BASE}/css3/css3-original.svg` },
  typescript:       { url: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  javascript:       { url: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  nodejs:           { url: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  python:           { url: `${DEVICON_BASE}/python/python-original.svg` },
  go:               { url: `${DEVICON_BASE}/go/go-original.svg` },
  golang:           { url: `${DEVICON_BASE}/go/go-original.svg` },
  php:              { url: `${DEVICON_BASE}/php/php-original.svg` },
  dart:             { url: `${DEVICON_BASE}/dart/dart-original.svg` },
  flutter:          { url: `${DEVICON_BASE}/flutter/flutter-original.svg` },

  // Frameworks & libraries
  react:            { url: `${DEVICON_BASE}/react/react-original.svg` },
  reactjs:          { url: `${DEVICON_BASE}/react/react-original.svg` },
  nextjs:           { url: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, tone: "dark" },
  nestjs:           { url: `${DEVICON_BASE}/nestjs/nestjs-original.svg` },
  express:          { url: `${DEVICON_BASE}/express/express-original.svg`, tone: "dark" },
  expressjs:        { url: `${DEVICON_BASE}/express/express-original.svg`, tone: "dark" },
  vuejs:            { url: `${DEVICON_BASE}/vuejs/vuejs-original.svg` },
  angularjs:        { url: `${DEVICON_BASE}/angularjs/angularjs-original.svg` },
  fastapi:          { url: `${DEVICON_BASE}/fastapi/fastapi-original.svg` },
  laravel:          { url: `${DEVICON_BASE}/laravel/laravel-original.svg` },
  tailwindcss:      { url: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  graphql:          { url: `${DEVICON_BASE}/graphql/graphql-plain.svg` },
  sass:             { url: `${DEVICON_BASE}/sass/sass-original.svg` },
  redux:            { url: `${DEVICON_BASE}/redux/redux-original.svg` },
  d3js:             { url: `${DEVICON_BASE}/d3js/d3js-original.svg` },

  // Databases & backend services
  postgresql:       { url: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
  mysql:            { url: `${DEVICON_BASE}/mysql/mysql-original.svg` },
  mongodb:          { url: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
  redis:            { url: `${DEVICON_BASE}/redis/redis-original.svg` },
  prisma:           { url: `${DEVICON_BASE}/prisma/prisma-original.svg` },
  firebase:         { url: `${DEVICON_BASE}/firebase/firebase-original.svg` },
  supabase:         { url: `${DEVICON_BASE}/supabase/supabase-original.svg` },

  // Payments
  stripe:           { url: `${SIMPLE_ICONS_BASE}/stripe.svg`, tone: "dark" },
  xendit:           { url: `${SIMPLE_ICONS_BASE}/xendit.svg`, tone: "dark" },

  // Cloud & infrastructure
  docker:           { url: `${DEVICON_BASE}/docker/docker-original.svg` },
  kubernetes:       { url: `${DEVICON_BASE}/kubernetes/kubernetes-plain.svg` },
  k8s:              { url: `${DEVICON_BASE}/kubernetes/kubernetes-plain.svg` },
  terraform:        { url: `${DEVICON_BASE}/terraform/terraform-original.svg` },
  cloudflare:       { url: `${DEVICON_BASE}/cloudflare/cloudflare-original.svg` },
  cloudflarer2:     { url: `${DEVICON_BASE}/cloudflare/cloudflare-original.svg` },
  grafana:          { url: `${DEVICON_BASE}/grafana/grafana-original.svg` },
  kibana:           { url: `${DEVICON_BASE}/kibana/kibana-original.svg` },
  amazonwebservices: { url: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  aws:              { url: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  awsses:           { url: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  googlecloud:      { url: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg` },

  // AI tools
  claude:           { url: `${SIMPLE_ICONS_BASE}/anthropic.svg`, tone: "dark" },
  claudecode:       { url: `${SIMPLE_ICONS_BASE}/anthropic.svg`, tone: "dark" },
  anthropic:        { url: `${SIMPLE_ICONS_BASE}/anthropic.svg`, tone: "dark" },
  gemini:           { url: `${SIMPLE_ICONS_BASE}/googlegemini.svg`, tone: "dark" },
  googlegemini:     { url: `${SIMPLE_ICONS_BASE}/googlegemini.svg`, tone: "dark" },
  perplexity:       { url: `${SIMPLE_ICONS_BASE}/perplexity.svg`, tone: "dark" },

  // Developer & productivity tools
  git:              { url: `${DEVICON_BASE}/git/git-original.svg` },
  github:           { url: `${DEVICON_BASE}/github/github-original.svg`, tone: "dark" },
  vscode:           { url: `${DEVICON_BASE}/vscode/vscode-original.svg` },
  figma:            { url: `${DEVICON_BASE}/figma/figma-original.svg` },
  postman:          { url: `${DEVICON_BASE}/postman/postman-original.svg` },
  dbeaver:          { url: `${DEVICON_BASE}/dbeaver/dbeaver-original.svg` },
  babel:            { url: `${DEVICON_BASE}/babel/babel-original.svg` },
  webpack:          { url: `${DEVICON_BASE}/webpack/webpack-original.svg` },
  swagger:          { url: `${DEVICON_BASE}/swagger/swagger-original.svg` },
  swaggerapi:       { url: `${DEVICON_BASE}/swagger/swagger-original.svg` },
  confluence:       { url: `${DEVICON_BASE}/confluence/confluence-original.svg` },
  resend:           { url: `${SIMPLE_ICONS_BASE}/resend.svg`, tone: "dark" },
  posthog:          { url: `${SIMPLE_ICONS_BASE}/posthog.svg`, tone: "dark" },
};

/** Strips punctuation/spacing so "Node.js", "node js", "NodeJS" all resolve the same way. */
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getDeviconUrl(tag: string): string | undefined {
  return ICON_ENTRIES[normalizeTag(tag)]?.url;
}

export function getIconTone(tag: string): "dark" | "light" | undefined {
  return ICON_ENTRIES[normalizeTag(tag)]?.tone;
}
