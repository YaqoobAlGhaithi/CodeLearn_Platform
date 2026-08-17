import { z } from "zod";

export function calculateProgress(current: number, total: number): number {
  if (total <= 0 || current <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / total) * 100)));
}

export const createTopicInput = z.object({
  title: z.string().trim().min(5).max(160),
  content: z.string().trim().min(10).max(5000),
  category: z.string().trim().min(2).max(64).default("general"),
});

export const createCommentInput = z.object({
  topicId: z.number().int().positive(),
  content: z.string().trim().min(2).max(2000),
});

export type CreateTopicInput = z.infer<typeof createTopicInput>;
export type CreateCommentInput = z.infer<typeof createCommentInput>;
