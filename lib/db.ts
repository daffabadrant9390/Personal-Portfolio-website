import "server-only";
import type { PrismaClient } from "@/generated/prisma/client";
import { createPrismaClient } from "@/lib/prisma-client";

/**
 * Shared Prisma client for the app. Server only: DATABASE_URL must never reach
 * the browser.
 *
 * The client is cached on globalThis so `next dev` hot reloads reuse one
 * connection pool instead of opening a new one on every file change.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getDb(): PrismaClient {
  globalForPrisma.prisma ??= createPrismaClient();
  return globalForPrisma.prisma;
}
