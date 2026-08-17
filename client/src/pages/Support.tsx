import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Code2, Heart } from "lucide-react";
import { toast } from "sonner";

export default function Support() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <Coffee className="h-4 w-4" /> دعم المطورين
            </span>
            <h1 className="mb-4 text-4xl font-black tracking-tight">ادعم مطوري الموقع</h1>
            <p className="text-lg text-muted-foreground">شجع الفريق الخلفي والمطورين على الاستمرار في تقديم أفضل محتوى تقني عربي.</p>
          </div>
        </section>

        <section className="container max-w-2xl py-16">
          <Card className="border-border text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent text-3xl">
                <Heart className="h-8 w-8 fill-accent" />
              </div>
              <CardTitle className="text-2xl">شكراً لتقديرك لجهودنا</CardTitle>
              <CardDescription>كل دعم رمزي يساهم في إبقاء المنصة مجانية ومستمرة في تطوير الأدوات التعليمية.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground leading-7">
                نعمل بجهد مستمر لإضافة المزيد من المسارات التفاعلية ومحرر الأكواد لتسهيل التعلم البرمجي. يمكنك دعمنا عبر مشاركة المنصة مع أصدقائك أو التواصل معنا للمساهمة في البرمجة والمحتوى.
              </p>
              <Button onClick={() => toast.success("شكراً لدعمك المعنوي الكبير!")} className="w-full gap-2">
                <Code2 className="h-4 w-4" /> ساهم في تطوير المنصة على GitHub
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
