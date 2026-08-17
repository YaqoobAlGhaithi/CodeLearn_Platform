import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight">شروط الاستخدام</h1>
            <p className="text-lg text-muted-foreground">القواعد والأحكام المنظمة لاستخدام منصة CodeLearn.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-16">
          <Card className="border-border">
            <CardContent className="space-y-6 pt-6 text-muted-foreground leading-8">
              <h3 className="text-xl font-bold text-foreground">1. قبول الشروط</h3>
              <p>باستخدامك لمنصة CodeLearn، فإنك توافق على الالتزام بهذه الشروط والأحكام كافة.</p>

              <h3 className="text-xl font-bold text-foreground">2. حقوق الملكية الفكرية</h3>
              <p>جميع المحتويات التعليمية، الأكواد، التصاميم، والشارات مملوكة للمنصة ومحمية بحقوق الملكية الفكرية ولا يُسمح بإعادة نشرها تجارياً دون إذن.</p>

              <h3 className="text-xl font-bold text-foreground">3. سلوك المستخدم</h3>
              <p>يُحظر استخدام المنصة في أي أعمال مخالفة للقانون أو نشر محتوى مسيء في مجتمع النقاش والمنتديات.</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
