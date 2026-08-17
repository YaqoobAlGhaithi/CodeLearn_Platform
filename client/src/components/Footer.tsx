import { APP_TITLE } from "@/const";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg text-primary mb-4">{APP_TITLE}</h3>
            <p className="text-sm text-muted-foreground leading-7">
              منصة تعليمية متكاملة لتعلم البرمجة من الصفر للمبتدئين في الوطن العربي بكل سهولة واحترافية.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">الروابط السريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"><a className="text-muted-foreground hover:text-primary transition-colors">الرئيسية</a></Link></li>
              <li><Link href="/courses"><a className="text-muted-foreground hover:text-primary transition-colors">المسارات التعليمية</a></Link></li>
              <li><Link href="/playground"><a className="text-muted-foreground hover:text-primary transition-colors">ملعب الكود</a></Link></li>
              <li><Link href="/forum"><a className="text-muted-foreground hover:text-primary transition-colors">المنتدى</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">الدعم والمساعدة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><a className="text-muted-foreground hover:text-primary transition-colors">عن المنصة</a></Link></li>
              <li><Link href="/contact"><a className="text-muted-foreground hover:text-primary transition-colors">تواصل معنا</a></Link></li>
              <li><Link href="/faq"><a className="text-muted-foreground hover:text-primary transition-colors">الأسئلة الشائعة</a></Link></li>
              <li><Link href="/report"><a className="text-muted-foreground hover:text-primary transition-colors">أبلغ عن مشكلة</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">قانوني ورعاية</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy"><a className="text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</a></Link></li>
              <li><Link href="/terms"><a className="text-muted-foreground hover:text-primary transition-colors">شروط الاستخدام</a></Link></li>
              <li><Link href="/sponsorship"><a className="text-muted-foreground hover:text-primary transition-colors">برامج الرعاية</a></Link></li>
              <li><Link href="/support"><a className="text-muted-foreground hover:text-primary transition-colors">دعم المطورين</a></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {APP_TITLE}. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-muted-foreground">
            <a href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Github className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
