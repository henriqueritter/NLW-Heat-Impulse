import { PrismaClient } from '@prisma/client';
//faz connection com o BD
const prismaClient = new PrismaClient();

export default prismaClient;