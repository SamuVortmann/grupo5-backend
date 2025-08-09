import postgres from "postgres";
import 'dotenv/config' // process.env

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE ,PGCHANNELBINDING} = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=${PGSSLMODE}&channel_binding=${PGCHANNELBINDING}`

export const sql = postgres(URL);
const resposta = await sql`SELECT * FROM items`;
console.log(resposta)