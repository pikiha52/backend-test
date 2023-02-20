import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const usersTable = prisma.users

export {
    prisma,
    usersTable
}