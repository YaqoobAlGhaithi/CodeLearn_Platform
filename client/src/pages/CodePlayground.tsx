import { useAuth } from "@/_core/hooks/useAuth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import { useLocation } from "wouter";

export default function CodePlayground() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">يجب تسجيل الدخول أولاً</h1>
          <p className="text-muted-foreground mb-8">
            يرجى تسجيل الدخول لاستخدام محرر الكود التفاعلي
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const htmlExample = `<!DOCTYPE html>
<html dir="rtl">
<head>
  <title>مثال HTML</title>
</head>
<body>
  <h1>مرحباً بك في HTML!</h1>
  <p>هذا مثال بسيط على صفحة ويب</p>
</body>
</html>`;

  const jsExample = `// مثال على JavaScript
const greeting = "مرحباً بك في JavaScript!";
console.log(greeting);

// حلقة بسيطة
for (let i = 1; i <= 5; i++) {
  console.log(\`العدد: \${i}\`);
}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border py-12 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              ملعب الكود التفاعلي
            </h1>
            <p className="text-lg text-muted-foreground">
              جرب الأكواس مباشرة وشاهد النتائج فوراً
            </p>
          </div>
        </section>

        {/* JavaScript Playground */}
        <section className="py-12 border-b border-border">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              ملعب JavaScript
            </h2>
            <CodeEditor
              initialCode={jsExample}
              language="javascript"
              title="محرر JavaScript"
            />
          </div>
        </section>

        {/* HTML Playground */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              ملعب HTML
            </h2>
            <CodeEditor
              initialCode={htmlExample}
              language="html"
              title="محرر HTML"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
