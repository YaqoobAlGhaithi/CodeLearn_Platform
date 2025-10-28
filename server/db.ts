import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, courses, lessons, userProgress, achievements, userAchievements } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Course queries
export async function getCourses() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(courses).orderBy(courses.order);
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Lesson queries
export async function getLessonsByCourseId(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(lessons.order);
}

export async function getLessonById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// User Progress queries
export async function getUserProgress(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(userProgress).where(
    and(eq(userProgress.userId, userId), eq(userProgress.courseId, courseId))
  );
}

export async function markLessonComplete(userId: number, courseId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db.select().from(userProgress).where(
    and(
      eq(userProgress.userId, userId),
      eq(userProgress.courseId, courseId),
      eq(userProgress.lessonId, lessonId)
    )
  ).limit(1);

  if (existing.length > 0) {
    await db.update(userProgress).set({
      isCompleted: 1,
      completedAt: new Date(),
    }).where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.courseId, courseId),
        eq(userProgress.lessonId, lessonId)
      )
    );
  } else {
    await db.insert(userProgress).values({
      userId,
      courseId,
      lessonId,
      isCompleted: 1,
      completedAt: new Date(),
    });
  }
}

// Achievement queries
export async function getAchievements() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(achievements);
}

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
}
