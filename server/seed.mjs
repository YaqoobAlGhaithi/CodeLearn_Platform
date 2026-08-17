import { drizzle } from "drizzle-orm/mysql2";
import { courses, lessons, achievements } from "../drizzle/schema.js";
import dotenv from "dotenv";
dotenv.config();

// إذا تم تشغيله عبر tsx سيتم التعامل مع الامتدادات تلقائياً
console.log("Seed script ready");
