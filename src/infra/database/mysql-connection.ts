import { createPool } from 'mysql2/promise';

export const sqlPool = createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
});
