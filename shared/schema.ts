import { pgTable, serial, text, timestamp, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Quiz responses table
export const quizResponses = pgTable("quiz_responses", {
  id: serial("id").primaryKey(),
  answers: json("answers").notNull(), // Array of { questionId: number, answerId: number }
  score: integer("score").notNull(),
  isDNA: boolean("is_dna").notNull(), // true if score >= 6
  createdAt: timestamp("created_at").defaultNow()
});

// Types
export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({ id: true, createdAt: true });
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;

// Quiz data structure (not stored in DB, used in frontend)
export interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    isDNA: boolean;
  }[];
}