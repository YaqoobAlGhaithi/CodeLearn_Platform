import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createCommentInput, createTopicInput } from "@shared/learning";
import {
  getCourses,
  getCourseById,
  getLessonsByCourseId,
  getLessonById,
  getUserProgress,
  markLessonComplete,
  getAchievements,
  getUserAchievements,
  getForumTopics,
  createForumTopic,
  getForumComments,
  createForumComment,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Courses Router
  courses: router({
    list: publicProcedure.query(async () => {
      return await getCourses();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getCourseById(input.id);
      }),
  }),

  // Lessons Router
  lessons: router({
    getByCourseId: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return await getLessonsByCourseId(input.courseId);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getLessonById(input.id);
      }),
  }),

  // User Progress Router
  progress: router({
    getCourseProgress: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await getUserProgress(ctx.user.id, input.courseId);
      }),
    markLessonComplete: protectedProcedure
      .input(z.object({ courseId: z.number(), lessonId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await markLessonComplete(ctx.user.id, input.courseId, input.lessonId);
        return { success: true };
      }),
  }),

  // Achievements Router
  achievements: router({
    list: publicProcedure.query(async () => {
      return await getAchievements();
    }),
    getUserAchievements: protectedProcedure.query(async ({ ctx }) => {
      return await getUserAchievements(ctx.user.id);
    }),
  }),

  forum: router({
    topics: publicProcedure.query(async () => {
      return await getForumTopics();
    }),
    createTopic: protectedProcedure
      .input(createTopicInput)
      .mutation(async ({ ctx, input }) => {
        await createForumTopic(ctx.user.id, input.title, input.content, input.category);
        return { success: true } as const;
      }),
    comments: publicProcedure
      .input(z.object({ topicId: z.number().int().positive() }))
      .query(async ({ input }) => {
        return await getForumComments(input.topicId);
      }),
    createComment: protectedProcedure
      .input(createCommentInput)
      .mutation(async ({ ctx, input }) => {
        await createForumComment(input.topicId, ctx.user.id, input.content);
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
