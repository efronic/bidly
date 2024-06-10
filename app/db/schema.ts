import { pgTable, serial } from 'drizzle-orm/pg-core';

export const bids = pgTable('bidly_bids', {
  id: serial('id').primaryKey(),
    // user_id: 'integer',
    // auction_id: 'integer',
    // amount: 'integer',
    // created_at: 'timestamp',
    // updated_at: 'timestamp',
});
