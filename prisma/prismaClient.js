import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma as user };  // exportando a instância do Prisma
