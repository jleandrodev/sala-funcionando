/**
 * @sala-funcionando/database
 *
 * Pacote de infraestrutura de banco de dados.
 * Exporta o PrismaClient singleton e re-exporta tipos gerados pelo Prisma.
 */

export { prisma } from "./client";
export { PrismaClient } from "@prisma/client";

// Re-exportar tipos gerados pelo Prisma conforme modelos forem adicionados
// export type { Professor, Turma, Aluno, ... } from "@prisma/client";
