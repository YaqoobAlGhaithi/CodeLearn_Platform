import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Courses() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: coursesData, isLoading } = trpc.courses.list.useQuery();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">يجب تسجيل الدخول أولاً</h1>
          <p className="text-muted-foreground mb-8">
            يرجى تسجيل الدخول لعرض المسارات التعليمية
          </p>
          <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
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
        <section className="border-b border-border py-12">
          <div className="container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              المسارات التعليمية
            </h1>
            <p className="text-lg text-muted-foreground">
              اختر المسار المناسب لك وابدأ رحلة التعلم
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : coursesData && coursesData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData.map((course) => (
                  <Card
                    key={course.id}
                    className="border-border hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group flex flex-col"
                  >
                    <CardHeader>
                      <div className={`mb-4 p-4 rounded-lg w-fit ${course.color || "bg-blue-100"}`}>
                        <span className="text-2xl">📚</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {course.level === "beginner"
                          ? "مبتدئ"
                          : course.level === "intermediate"
                          ? "متوسط"
                          : "متقدم"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-6 flex-1">
                        {course.description}
                      </p>
                      <Link href={`/course/${course.id}`}>
                        <a>
                          <Button className="w-full gap-2">
                            ابدأ الآن
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  لا توجد مسارات متاحة حالياً
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
