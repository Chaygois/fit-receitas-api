import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const _user = prisma.user;
