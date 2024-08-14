import {
  timestamp,
  pgTable,
  text,
  serial,
  doublePrecision,
  integer,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';


export const users = pgTable('bidly_user', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
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
  endDate: timestamp('endDate', { mode: 'date' }).notNull(),
});

export const bids = pgTable('bidly_bids', {
  id: serial('id').primaryKey(),
  amount: integer('amount').notNull(),
  itemId: serial('itemId')
    .notNull()
    .references(() => items.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  timestamp: timestamp('timestamp', { mode: 'date' }).notNull(),
});

export const usersRelations = relations(bids, ({ one }) => ({
  users: one(users, { fields: [bids.userId], references: [users.id] }),
}));

export type Item = typeof items.$inferSelect;
export type User = typeof users.$inferSelect;
export type Bid = typeof bids.$inferSelect;
