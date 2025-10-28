import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useLocation, useRoute } from "wouter";

export default function Lesson() {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/lesson/:courseId/:lessonId");

  const courseId = params?.courseId ? parseInt(params.courseId) : null;
  const lessonId = params?.lessonId ? parseInt(params.lessonId) : null;

  const { data: lesson, isLoading: lessonLoading } = trpc.lessons.getById.useQuery(
    { id: lessonId! },
    { enabled: !!lessonId }
  );

  const { data: course, isLoading: courseLoading } = trpc.courses.getById.useQuery(
    { id: courseId! },
    { enabled: !!courseId }
  );

  const markCompleteMutation = trpc.progress.markLessonComplete.useMutation({
    onSuccess: () => {
      alert("تم تحديث تقدمك!");
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">يجب تسجيل الدخول أولاً</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (lessonLoading || courseLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">لم يتم العثور على الدرس</h1>
          <Button onClick={() => navigate("/courses")}>العودة للمسارات</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border py-8 bg-muted/30">
          <div className="container">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للمسارات
            </button>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {lesson.title}
            </h1>
            <p className="text-muted-foreground">
              {course.title}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>محتوى الدرس</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {lesson.description && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">الوصف</h3>
                        <p className="text-muted-foreground">{lesson.description}</p>
                      </div>
                    )}

                    {lesson.content && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">المحتوى</h3>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground">{lesson.content}</p>
                        </div>
                      </div>
                    )}

                    {lesson.codeExample && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">مثال برمجي</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <code className="text-sm">{lesson.codeExample}</code>
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="border-border sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">تقدمك</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        درس مكتمل
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        if (courseId && lessonId) {
                          markCompleteMutation.mutate({
                            courseId,
                            lessonId,
                          });
                        }
                      }}
                      disabled={markCompleteMutation.isPending}
                      className="w-full"
                    >
                      {markCompleteMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          جاري التحديث...
                        </>
                      ) : (
                        "تحديث التقدم"
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => navigate("/courses")}
                      className="w-full"
                    >
                      الدرس التالي
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
