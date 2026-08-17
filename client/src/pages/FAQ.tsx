import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container max-w-4xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <HelpCircle className="h-4 w-4" /> مركز المساعدة
            </span>
            <h1 className="mb-4 text-4xl font-black tracking-tight">الأسئلة الشائعة</h1>
            <p className="text-lg text-muted-foreground">إجابات شاملة عن كل ما تود معرفته حول المنصة والتعلم.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-16">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="rounded-xl border border-border px-6">
              <AccordionTrigger className="text-lg font-bold">هل المنصة مجانية بالكامل؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-7">
                نعم! جميع المسارات الأساسية ومحرر الكود التفاعلي ومجتمع النقاش متاحة مجاناً للمبتدئين في الوطن العربي.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-xl border border-border px-6">
              <AccordionTrigger className="text-lg font-bold">هل أحتاج إلى خبرة سابقة لتعلم البرمجة؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-7">
                لا تتطلب المنصة أي خبرة مسبقة؛ فقد صُممت المسارات خصيصاً لتأخذ بيد المبتدئ خطوة بخطوة من الصفر وحتى الاحتراف.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-xl border border-border px-6">
              <AccordionTrigger className="text-lg font-bold">كيف يمكنني استخدام محرر الكود التفاعلي؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-7">
                يمكنك الانتقال إلى قسم "ملعب الكود" أو فتح أي درس تفاعلي لكتابة الأكواد وتجاربها ومشاهدة النتائج فورا دون الحاجة لتثبيت أي برامج على جهازك.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="rounded-xl border border-border px-6">
              <AccordionTrigger className="text-lg font-bold">كيف أحفظ تقدمي في الدورات؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-7">
                يمكنك تسجيل الدخول عبر حسابك الشخصي ليتم حفظ تقدمك، تتبع الدروس المكتملة، وحصد الشارات والنقاط التحفيزية.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
}
