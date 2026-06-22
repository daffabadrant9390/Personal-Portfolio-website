const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Keyed by a normalized (lowercase, alnum-only) tag name. */
const DEVICON_MAP: Record<string, string> = {
  react:           `${DEVICON_BASE}/react/react-original.svg`,
  reactjs:         `${DEVICON_BASE}/react/react-original.svg`,
  typescript:      `${DEVICON_BASE}/typescript/typescript-original.svg`,
  javascript:      `${DEVICON_BASE}/javascript/javascript-original.svg`,
  nodejs:          `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  python:          `${DEVICON_BASE}/python/python-original.svg`,
  nextjs:          `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  nestjs:          `${DEVICON_BASE}/nestjs/nestjs-original.svg`,
  vuejs:           `${DEVICON_BASE}/vuejs/vuejs-original.svg`,
  angularjs:       `${DEVICON_BASE}/angularjs/angularjs-original.svg`,
  go:              `${DEVICON_BASE}/go/go-original.svg`,
  golang:          `${DEVICON_BASE}/go/go-original.svg`,
  fastapi:         `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  graphql:         `${DEVICON_BASE}/graphql/graphql-plain.svg`,
  postgresql:      `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  mysql:           `${DEVICON_BASE}/mysql/mysql-original.svg`,
  mongodb:         `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  redis:           `${DEVICON_BASE}/redis/redis-original.svg`,
  prisma:          `${DEVICON_BASE}/prisma/prisma-original.svg`,
  docker:          `${DEVICON_BASE}/docker/docker-original.svg`,
  kubernetes:      `${DEVICON_BASE}/kubernetes/kubernetes-plain.svg`,
  k8s:             `${DEVICON_BASE}/kubernetes/kubernetes-plain.svg`,
  terraform:       `${DEVICON_BASE}/terraform/terraform-original.svg`,
  d3js:            `${DEVICON_BASE}/d3js/d3js-original.svg`,
  firebase:        `${DEVICON_BASE}/firebase/firebase-original.svg`,
  supabase:        `${DEVICON_BASE}/supabase/supabase-original.svg`,
  tailwindcss:     `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  html5:           `${DEVICON_BASE}/html5/html5-original.svg`,
  sass:            `${DEVICON_BASE}/sass/sass-original.svg`,
  redux:           `${DEVICON_BASE}/redux/redux-original.svg`,
  git:             `${DEVICON_BASE}/git/git-original.svg`,
  amazonwebservices: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  googlecloud:     `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
};

/** Strips punctuation/spacing so "Node.js", "node js", "NodeJS" all resolve the same way. */
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getDeviconUrl(tag: string): string | undefined {
  return DEVICON_MAP[normalizeTag(tag)];
}
