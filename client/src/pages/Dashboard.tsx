import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { BarChart3, BookOpen, Award, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();

  const { data: courses, isLoading: coursesLoading } = trpc.courses.list.useQuery();
  const { data: achievements, isLoading: achievementsLoading } = trpc.achievements.getUserAchievements.useQuery();

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border py-12 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              مرحباً، {user?.name || "المتعلم"}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              تابع تقدمك في رحلة التعلم
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المسارات المتاحة</CardTitle>
                  <BookOpen className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {coursesLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      courses?.length || 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">مسارات تعليمية</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الإنجازات</CardTitle>
                  <Award className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {achievementsLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      achievements?.length || 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">شارات مكتسبة</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">النقاط الإجمالية</CardTitle>
                  <BarChart3 className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">نقطة</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                المسارات المتاحة
              </h2>
              <p className="text-muted-foreground">
                استمر في تعلمك واكتسب مهارات جديدة
              </p>
            </div>

            {coursesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-border hover:shadow-lg transition-all hover:border-primary/50"
                  >
                    <CardHeader>
                      <div className={`mb-4 p-3 rounded-lg w-fit ${course.color || "bg-blue-100"}`}>
                        <span className="text-2xl">📚</span>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        {course.level === "beginner"
                          ? "مبتدئ"
                          : course.level === "intermediate"
                          ? "متوسط"
                          : "متقدم"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.description}
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mb-4">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        0% مكتمل
                      </p>
                      <Link href={`/course/${course.id}`}>
                        <a>
                          <Button variant="outline" className="w-full">
                            استمر في التعلم
                          </Button>
                        </a>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  لا توجد مسارات متاحة حالياً
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <section className="py-12 border-t border-border bg-muted/30">
            <div className="container">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                الإنجازات المكتسبة
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="border-border text-center">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">🏆</div>
                      <p className="font-semibold">إنجاز مكتسب</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(achievement.earnedAt).toLocaleDateString("ar-SA")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
