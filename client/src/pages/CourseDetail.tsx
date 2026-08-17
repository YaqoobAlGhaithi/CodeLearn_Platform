import type { ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, Loader2, LockKeyhole } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";

export default function CourseDetail() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/course/:courseId");
  const courseId = params?.courseId ? Number(params.courseId) : 0;
  const courseQuery = trpc.courses.getById.useQuery({ id: courseId }, { enabled: courseId > 0 });
  const lessonsQuery = trpc.lessons.getByCourseId.useQuery({ courseId }, { enabled: courseId > 0 });
  const progressQuery = trpc.progress.getCourseProgress.useQuery({ courseId }, { enabled: isAuthenticated && courseId > 0 });

  if (courseQuery.isLoading || lessonsQuery.isLoading) {
    return <Shell><div className="flex min-h-[55vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="جاري التحميل" /></div></Shell>;
  }

  const course = courseQuery.data;
  const lessons = lessonsQuery.data ?? [];
  const completedIds = new Set((progressQuery.data ?? []).filter((item) => item.isCompleted === 1).map((item) => item.lessonId));

  if (!course || courseId <= 0) {
    return <Shell><div className="container flex min-h-[55vh] flex-col items-center justify-center text-center"><h1 className="mb-4 text-3xl font-bold">لم يتم العثور على المسار</h1><Button onClick={() => navigate("/courses")}>العودة إلى المسارات</Button></div></Shell>;
  }

  return (
    <Shell>
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
          <div className="container">
            <button className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary" onClick={() => navigate("/courses")}><ArrowLeft className="h-4 w-4" />العودة إلى المسارات</button>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className={`mb-5 inline-flex rounded-2xl p-4 text-4xl ${course.color ?? "bg-primary/10"}`}>{course.icon ?? "📚"}</div>
                <h1 className="mb-4 text-4xl font-black tracking-tight">{course.title}</h1>
                <p className="text-lg leading-8 text-muted-foreground">{course.description}</p>
                <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground"><span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />{lessons.length} دروس</span><span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" />حوالي {lessons.length * 15} دقيقة</span><span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{course.level === "beginner" ? "مبتدئ" : course.level === "intermediate" ? "متوسط" : "متقدم"}</span></div>
              </div>
              <Card className="w-full md:max-w-xs"><CardContent className="p-5"><p className="mb-3 font-bold">تقدمك في المسار</p><ProgressBar current={completedIds.size} total={lessons.length} showPercentage />{!isAuthenticated && <p className="mt-3 text-xs text-muted-foreground">سجّل الدخول لحفظ تقدمك.</p>}</CardContent></Card>
            </div>
          </div>
        </section>
        <section className="container py-12">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm font-semibold text-primary">خطة التعلم</p><h2 className="text-2xl font-black">الدروس العملية</h2></div><span className="text-sm text-muted-foreground">{completedIds.size} من {lessons.length} مكتمل</span></div>
          {lessons.length === 0 ? <Card><CardContent className="py-12 text-center text-muted-foreground">لا توجد دروس متاحة حالياً.</CardContent></Card> : <div className="space-y-4">{lessons.map((lesson) => { const completed = completedIds.has(lesson.id); const locked = !isAuthenticated && lesson.order > 1; return <Card key={lesson.id} className={`transition-all hover:-translate-y-0.5 hover:shadow-md ${completed ? "border-emerald-200 bg-emerald-50/30" : ""}`}><CardHeader className="pb-3"><div className="flex items-start justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">الدرس {lesson.order}</p><CardTitle className="text-xl">{lesson.title}</CardTitle></div>{completed ? <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" /> : locked ? <LockKeyhole className="h-5 w-5 shrink-0 text-muted-foreground" /> : null}</div></CardHeader><CardContent><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><p className="max-w-2xl text-sm leading-7 text-muted-foreground">{lesson.description}</p>{locked ? <Button variant="outline" onClick={() => navigate("/")}>سجّل الدخول</Button> : <Link href={`/lesson/${courseId}/${lesson.id}`}><Button variant={completed ? "outline" : "default"}>{completed ? "مراجعة الدرس" : "ابدأ الدرس"}</Button></Link>}</div></CardContent></Card>; })}</div>}
        </section>
      </main>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-background"><Navbar />{children}<Footer /></div>;
}
