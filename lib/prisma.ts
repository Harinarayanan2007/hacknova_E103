import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    // Fallback to hardcoded URL if env is missing (fixes initialization error)
    const url = process.env.DATABASE_URL || "postgresql://postgres:12345678@localhost:5432/growally";

    return new PrismaClient({
        datasources: {
            db: {
                url: url,
            },
        },
    });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
