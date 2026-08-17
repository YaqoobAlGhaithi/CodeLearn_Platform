import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";

export default function Report() {
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("تم إرسال البلاغ بنجاح! شكراً لمساعدتنا في تحسين المنصة.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-semibold text-destructive">
              <AlertCircle className="h-4 w-4" /> الدعم الفني والبلاغات
            </span>
            <h1 className="mb-4 text-4xl font-black tracking-tight">أبلغ عن مشكلة أو خطأ</h1>
            <p className="text-lg text-muted-foreground">ساعدنا في رصد الروابط المعطلة أو الأخطاء البرمجية.</p>
          </div>
        </section>

        <section className="container max-w-2xl py-16">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">تفاصيل المشكلة</CardTitle>
              <CardDescription>أخبرنا بما واجهته لنقوم بحلها فوراً.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">✓</div>
                  <h3 className="text-xl font-bold">شكراً لمساهمتك!</h3>
                  <p className="text-muted-foreground">تم استلام بلاغك وسيقوم الفريق التقني بمراجعته.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">إرسال بلاغ آخر</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">عنوان المشكلة باختصار</label>
                    <Input value={issue} onChange={(e) => setIssue(e.target.value)} required placeholder="مثال: رابط الدرس الثالث لا يعمل" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">تفاصيل إضافية</label>
                    <Textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={5} required placeholder="اشرح الخطوات التي أدت إلى حدوث المشكلة..." />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" /> إرسال البلاغ
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
