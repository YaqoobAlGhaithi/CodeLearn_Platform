import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> عن منصة CodeLearn
            </span>
            <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl">نبني مستقبل المبرمجين العرب</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              منصة CodeLearn هي منصة تعليمية متكاملة تهدف إلى تسهيل تعلم البرمجة من الصفر وحتى الاحتراف للمبتدئين في الوطن العربي، من خلال محتوى عالي الجودة ومحركات تفاعلية مباشرة.
            </p>
          </div>
        </section>

        <section className="container max-w-5xl py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-2xl">🎯</div>
                <CardTitle>رسالتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  تمكين كل شغوف بالتقنية من اكتساب مهارات البرمجة الحقيقية بطرق مبسطة، تفاعلية، ومتاحة للجميع مجاناً.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3 text-2xl">👁️</div>
                <CardTitle>رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  أن نكون الوجهة الأولى والبيئة الأوثق لتخريج جيل واعٍ وقادر على بناء تطبيقات ويب وتقنيات منافسة عالمياً.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-xl bg-yellow-100 p-3 text-2xl">💡</div>
                <CardTitle>قيمنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  الجودة، التفاعل المستمر، تحفيز التعلم بالممارسة، وبناء مجتمع تقني متعاون ومتعاضد.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
