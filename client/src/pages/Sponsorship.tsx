import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, CheckCircle } from "lucide-react";

export default function Sponsorship() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <HeartHandshake className="h-4 w-4" /> شركاؤنا ورعاتنا
            </span>
            <h1 className="mb-4 text-4xl font-black tracking-tight">برامج الرعاية والدعم</h1>
            <p className="text-lg text-muted-foreground">ساهم معنا في تطوير المحتوى التعليمي المجاني ودعم مبرمجي المستقبل.</p>
          </div>
        </section>

        <section className="container max-w-5xl py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">رعاية فردية</CardTitle>
                <CardDescription>ادعم استمرار المنصة وتطوير دروس جديدة.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> دعم محتوى الدورات المجانية</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> المساهمة في تكاليف الخوادم والتشغيل</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> الحصول على شارة داعم مميز في المنتدى</li>
                </ul>
                <Button className="w-full">كن داعماً للمنصة</Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">رعاية الشركات والشركاء</CardTitle>
                <CardDescription>اربط علامتك التجارية بأكبر منصة تعليمية للمبتدئين.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> ظهور شعار الشركة في رعاية الدورات</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> الوصول إلى مجتمع تقني واسع</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> فرص استقطاب المواهب التقنية الناشئة</li>
                </ul>
                <Button variant="default" className="w-full">تواصل لشراكة الشركات</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
