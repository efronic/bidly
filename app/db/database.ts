import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';
import postgres from 'postgres';

declare global {
  var database: PostgresJsDatabase<typeof schema>;
}
let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;
if (process.env.NODE_ENV === 'production') {
  database = drizzle(postgres(process.env.DATABASE_URL!), { schema });
} else {
  if (!global.database) {
    global.database = drizzle(postgres(process.env.DATABASE_URL!), { schema });
  }
  database = global.database;
}
export { database, pg };
