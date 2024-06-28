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
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

// export const accounts = pgTable(
//   'bidly_account',
//   {
//     userId: text('userId')
//       .notNull()
//       .references(() => users.id, { onDelete: 'cascade' }),
//     type: text('type').$type<AdapterAccountType>().notNull(),
//     provider: text('provider').notNull(),
//     providerAccountId: text('providerAccountId').notNull(),
//     refresh_token: text('refresh_token'),
//     access_token: text('access_token'),
//     expires_at: integer('expires_at'),
//     token_type: text('token_type'),
//     scope: text('scope'),
//     id_token: text('id_token'),
//     session_state: text('session_state'),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   })
// );

// export const sessions = pgTable('bidly_session', {
//   sessionToken: text('sessionToken').primaryKey(),
//   userId: text('userId')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),
//   expires: timestamp('expires', { mode: 'date' }).notNull(),
// });

// export const verificationTokens = pgTable(
//   'bidly_verificationToken',
//   {
//     identifier: text('identifier').notNull(),
//     token: text('token').notNull(),
//     expires: timestamp('expires', { mode: 'date' }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   })
// );

// export const authenticators = pgTable(
//   'bidly_authenticator',
//   {
//     credentialID: text('credentialID').notNull().unique(),
//     userId: text('userId')
//       .notNull()
//       .references(() => users.id, { onDelete: 'cascade' }),
//     providerAccountId: text('providerAccountId').notNull(),
//     credentialPublicKey: text('credentialPublicKey').notNull(),
//     counter: integer('counter').notNull(),
//     credentialDeviceType: text('credentialDeviceType').notNull(),
//     credentialBackedUp: boolean('credentialBackedUp').notNull(),
//     transports: text('transports'),
//   },
//   (authenticator) => ({
//     compositePK: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   })
// );

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
  onDate: timestamp('onDate', { mode: 'date' }).notNull(),
});

export type Item = typeof items.$inferSelect;
export type User = typeof users.$inferSelect;
