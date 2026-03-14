import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Singleton do PrismaClient.
 *
 * Em desenvolvimento, o hot-reload do Next.js recria módulos a cada salvamento,
 * o que poderia criar múltiplas instâncias do PrismaClient e esgotar conexões.
 * Armazenar a instância em `globalThis` evita esse problema.
 *
 * Em produção, uma única instância é criada normalmente.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
