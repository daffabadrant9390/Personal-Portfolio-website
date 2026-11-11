import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

/**
 * Builds a Prisma client for MySQL through the MariaDB driver adapter, which is
 * what Prisma 7 requires. Kept free of "server-only" so the seed script can use
 * it too; the app itself goes through lib/db.ts.
 */
export function createPrismaClient(databaseUrl: string | undefined = process.env.DATABASE_URL): PrismaClient {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const url = new URL(databaseUrl);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    // URL parts are percent encoded, for example "!" arrives as "%21".
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: 5,
  });
  return new PrismaClient({ adapter });
}
