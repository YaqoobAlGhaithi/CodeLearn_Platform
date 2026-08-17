import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight">تواصل معنا</h1>
            <p className="text-lg text-muted-foreground">نحن هنا للإجابة على استفساراتك ومساعدتك في رحلتك البرمجية.</p>
          </div>
        </section>

        <section className="container max-w-2xl py-16">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
              <CardDescription>املأ النموذج أدناه وسنتواصل معك قريباً.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">✓</div>
                  <h3 className="text-xl font-bold">شكراً لتواصلك معنا!</h3>
                  <p className="text-muted-foreground">تم استلام رسالتك وسيتم مراجعتها من قبل الفريق المختص.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">إرسال رسالة أخرى</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">الاسم الكامل</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="أدخل اسمك الكريم" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">البريد الإلكتروني</label>
                    <Input type="email5" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">الرسالة</label>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required placeholder="اكتب استفسارك أو اقتراحك هنا..." />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" /> إرسال الرسالة
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
