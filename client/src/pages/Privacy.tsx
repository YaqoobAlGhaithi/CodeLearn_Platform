import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight">سياسة الخصوصية</h1>
            <p className="text-lg text-muted-foreground">نلتزم بحماية خصوصية بياناتك ومعلوماتك الشخصية.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-16">
          <Card className="border-border">
            <CardContent className="space-y-6 pt-6 text-muted-foreground leading-8">
              <h3 className="text-xl font-bold text-foreground">1. جمع المعلومات</h3>
              <p>نقوم بجمع بعض المعلومات الأساسية عند تسجيل الدخول (مثل الاسم والبريد الإلكتروني) بهدف حفظ تقدمك التعليمي وتوفير تجربة مخصصة لك.</p>

              <h3 className="text-xl font-bold text-foreground">2. استخدام البيانات</h3>
              <p>تُستخدم بياناتك فقط لتحسين خدمات المنصة، متابعة إنجازاتك، وإرسال التنبيهات المهمة المتعلقة بحسابك أو الدورات المسجل فيها.</p>

              <h3 className="text-xl font-bold text-foreground">3. أمان المعلومات</h3>
              <p>نتبع أعلى معايير الأمان التقنية والتشفير لحماية بياناتك من أي وصول غير مصرح به أو تسريب.</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
