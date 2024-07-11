import {
  timestamp,
  pgTable,
  text,
  serial,
  doublePrecision,
  integer,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// const connectionString = 'postgres://postgres:postgres@localhost:5432/drizzle';
// const pool = postgres(connectionString, { max: 1 });

// export const db = drizzle(pool);

export const users = pgTable('bidly_user', {
  id: text('id')
    .primaryKey()
    .notNull(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const bids = pgTable('bidly_bids', {
  id: serial('id').primaryKey(),
  name: text('name'),
  // user_id: 'integer',
  // auction_id: 'integer',
  // amount: 'integer',
  // created_at: 'timestamp',
  // updated_at: 'timestamp',
});
export const items = pgTable('bidly_items', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  fileKey: text('fileKey').notNull(),
  currentBid: integer('currentBid').default(0).notNull(),
  startingPrice: doublePrecision('startingPrice')
    .default(sql`'10.10'::double precision`)
    .notNull(),
  bidInterval: integer('bidInterval').default(100).notNull(),
  onDate: timestamp('onDate', { mode: 'date' }),
});

export type Item = typeof items.$inferSelect;
export type User = typeof users.$inferSelect;
