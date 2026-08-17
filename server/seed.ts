import { drizzle } from "drizzle-orm/mysql2";
import { courses, lessons, achievements } from "../drizzle/schema";

const coursesData = [
  { title: "أساسيات HTML", description: "تعلم لغة HTML من الصفر وفهم بنية صفحات الويب", level: "beginner" as const, icon: "📄", color: "bg-blue-100", order: 1 },
  { title: "تصميم مع CSS", description: "تعلم CSS وإنشاء تصاميم جميلة وجذابة", level: "beginner" as const, icon: "🎨", color: "bg-orange-100", order: 2 },
  { title: "JavaScript الأساسيات", description: "تعلم البرمجة باستخدام JavaScript والتفاعل مع صفحات الويب", level: "beginner" as const, icon: "⚡", color: "bg-yellow-100", order: 3 },
  { title: "React للمبتدئين", description: "تعلم مكتبة React وبناء تطبيقات ويب حديثة", level: "intermediate" as const, icon: "⚛️", color: "bg-cyan-100", order: 4 },
];

const lessonsData = [
  { courseId: 1, title: "مقدمة إلى HTML", description: "تعريف بلغة HTML وأهميتها", content: "HTML هي لغة الترميز الأساسية.", codeExample: "<p>مرحباً بك</p>", order: 1 },
  { courseId: 1, title: "العناصر والسمات", description: "فهم العناصر والسمات", content: "استخدام الروابط والصور.", codeExample: "<a href='#'>رابط</a>", order: 2 },
  { courseId: 2, title: "مقدمة إلى CSS", description: "تنسيق الصفحات", content: "إضافة الألوان والخطوط.", codeExample: "body { background: #eee; }", order: 1 },
  { courseId: 3, title: "المتغيرات في JS", description: "أساسيات JavaScript", content: "تخزين البيانات في متغيرات.", codeExample: "let x = 10;", order: 1 },
  { courseId: 4, title: "مكونات React", description: "بناء أول مكون", content: "استخدام مكونات React.", codeExample: "function App() { return <h1>Hello</h1> }", order: 1 },
];

const achievementsData = [
  { title: "المبرمج المبتدئ", description: "أكمل أول درس", icon: "🌱", points: 10 },
  { title: "خبير HTML", description: "أكمل مسار HTML", icon: "📄", points: 50 },
  { title: "فنان CSS", description: "أكمل مسار CSS", icon: "🎨", points: 50 },
];

async function runSeed() {
  if (!process.env.DATABASE_URL) {
    console.error("No DATABASE_URL");
    return;
  }
  const db = drizzle(process.env.DATABASE_URL);
  try {
    for (const c of coursesData) await db.insert(courses).values(c);
    for (const l of lessonsData) await db.insert(lessons).values(l);
    for (const a of achievementsData) await db.insert(achievements).values(a);
    console.log("Seeding completed successfully!");
  } catch (e) {
    console.log("Seeding notice (might already exist):", e instanceof Error ? e.message : String(e));
  }
}

runSeed();
