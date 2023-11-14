import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const folders = sqliteTable('folders', {
  id: integer('id').primaryKey(),
  title: text('title')
    .unique()
    .notNull()
    .$default(() => ''),
});

export const modules = sqliteTable('modules', {
  id: integer('id').primaryKey(),
  title: text('title')
    .notNull()
    .$default(() => ''),
  folderId: integer('folderId')
    .notNull()
    .references(() => folders.id, { onDelete: 'cascade' }),
});

export const cards = sqliteTable('cards', {
  id: integer('id').primaryKey(),
  firstValue: text('firstValue')
    .notNull()
    .$default(() => ''),
  secondValue: text('secondValue')
    .notNull()
    .$default(() => ''),
  moduleId: integer('moduleId')
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade' }),
});

export type Folder = typeof folders.$inferSelect;
export type InsertFolder = typeof folders.$inferSelect;

export type Module = typeof modules.$inferSelect;
export type InsertModule = typeof modules.$inferSelect;

export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferSelect;
