import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
    console.log("erorr in database");

    throw new Error('DATABASE_URL environment variable is not set');
}

export const db = drizzle(process.env.DATABASE_URL);
