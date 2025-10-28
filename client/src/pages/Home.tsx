import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getLoginUrl } from "@/const";
import { ArrowRight, Code2, BookOpen, Zap, Users, Award, Rocket } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "أساسيات HTML",
      description: "تعلم أساسيات لغة HTML وكيفية بناء صفحات الويب",
      level: "مبتدئ",
      icon: Code2,
      color: "bg-blue-100 text-blue-600",
      lessons: 12,
    },
    {
      id: 2,
      title: "تصميم مع CSS",
      description: "احترف تصميم الويب باستخدام CSS والتصميم المتجاوب",
      level: "مبتدئ",
      icon: Zap,
      color: "bg-orange-100 text-orange-600",
      lessons: 15,
    },
    {
      id: 3,
      title: "JavaScript الأساسي",
      description: "تعلم البرمجة باستخدام JavaScript من الصفر",
      level: "مبتدئ",
      icon: BookOpen,
      color: "bg-green-100 text-green-600",
      lessons: 20,
    },
    {
      id: 4,
      title: "React للمبتدئين",
      description: "بناء تطبيقات ويب تفاعلية باستخدام React",
      level: "متوسط",
      icon: Rocket,
      color: "bg-purple-100 text-purple-600",
      lessons: 18,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "محتوى تعليمي شامل",
      description: "دروس منظمة وسهلة الفهم موجهة للمبتدئين",
    },
    {
      icon: Code2,
      title: "محرر كود تفاعلي",
      description: "جرب الأكواد مباشرة دون الحاجة لأدوات خارجية",
    },
    {
      icon: Award,
      title: "نظام التحفيز",
      description: "احصل على نقاط وشارات مع تقدمك في التعلم",
    },
    {
      icon: Users,
      title: "مجتمع متعاون",
      description: "تفاعل مع متعلمين آخرين وشارك خبراتك",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  ابدأ رحلتك في تعلم البرمجة اليوم
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  منصة تعليمية متكاملة توفر لك كل ما تحتاجه لتعلم البرمجة من الصفر،
                  مع محتوى عالي الجودة وأدوات تفاعلية تساعدك على التعلم بسهولة.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {isAuthenticated ? (
                    <Link href="/courses">
                      <a>
                        <Button size="lg" className="gap-2">
                          استكشف المسارات
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </a>
                    </Link>
                  ) : (
                    <Button
                      size="lg"
                      onClick={() => (window.location.href = getLoginUrl())}
                      className="gap-2"
                    >
                      ابدأ الآن مجاناً
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  )}
                  <Link href="#features">
                    <a>
                      <Button size="lg" variant="outline">
                        تعرف على المزيد
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <Code2 className="h-48 w-48 text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-b border-border py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                لماذا تختار CodeLearn؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                نحن نوفر كل ما تحتاجه لتصبح مبرمجاً محترفاً
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                المسارات التعليمية
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                اختر المسار المناسب لك وابدأ التعلم
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <Card
                    key={course.id}
                    className="border-border hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group"
                  >
                    <CardHeader>
                      <div className={`mb-4 p-3 rounded-lg w-fit ${course.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {course.level} • {course.lessons} درس
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          if (!isAuthenticated) {
                            window.location.href = getLoginUrl();
                          }
                        }}
                      >
                        {isAuthenticated ? "ابدأ الآن" : "سجل الدخول"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {isAuthenticated && (
              <div className="text-center mt-12">
                <Link href="/courses">
                  <a>
                    <Button size="lg" variant="outline" className="gap-2">
                      عرض جميع المسارات
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="border-b border-border py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                هل أنت مستعد للبدء؟
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                انضم إلى آلاف المتعلمين الذين بدأوا رحلتهم في تعلم البرمجة معنا
              </p>
              <Button
                size="lg"
                onClick={() => (window.location.href = getLoginUrl())}
                className="gap-2"
              >
                ابدأ التعلم الآن
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
