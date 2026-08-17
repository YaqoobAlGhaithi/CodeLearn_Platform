import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { MessageCircle, MessageSquarePlus, RefreshCw, Send, Tag, UserRound } from "lucide-react";
import { toast } from "sonner";

export default function Forum() {
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const topicsQuery = trpc.forum.topics.useQuery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createTopic = trpc.forum.createTopic.useMutation({
    onSuccess: async () => {
      await utils.forum.topics.invalidate();
      setTitle("");
      setContent("");
      setDialogOpen(false);
      toast.success("تم نشر موضوعك بنجاح");
    },
    onError: (error) => toast.error(error.message || "تعذر نشر الموضوع"),
  });

  const submitTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTopic.mutate({ title, content, category: "general" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-14">
          <div className="container flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">مجتمع CodeLearn</p>
              <h1 className="mb-4 text-4xl font-black tracking-tight">تعلّم مع الآخرين وشارك خبرتك</h1>
              <p className="text-lg leading-8 text-muted-foreground">اطرح أسئلتك، ناقش حلول التمارين، وابنِ عادة التعلم الجماعي في مساحة آمنة للمبتدئين.</p>
            </div>
            {isAuthenticated ? (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild><Button className="gap-2"><MessageSquarePlus className="h-4 w-4" />موضوع جديد</Button></DialogTrigger>
                <DialogContent dir="rtl" className="sm:max-w-lg">
                  <DialogHeader><DialogTitle>إنشاء موضوع جديد</DialogTitle><DialogDescription>اكتب سؤالك أو شارك تجربتك مع مجتمع المتعلمين.</DialogDescription></DialogHeader>
                  <form className="space-y-4" onSubmit={submitTopic}>
                    <div><label className="mb-2 block text-sm font-semibold" htmlFor="topic-title">العنوان</label><Input id="topic-title" value={title} onChange={(event) => setTitle(event.target.value)} minLength={5} maxLength={160} required placeholder="مثال: كيف أستخدم Flexbox؟" /></div>
                    <div><label className="mb-2 block text-sm font-semibold" htmlFor="topic-content">المحتوى</label><Textarea id="topic-content" value={content} onChange={(event) => setContent(event.target.value)} minLength={10} maxLength={5000} required rows={6} placeholder="اشرح سؤالك أو فكرتك بالتفصيل..." /></div>
                    <Button className="w-full gap-2" type="submit" disabled={createTopic.isPending}><Send className="h-4 w-4" />{createTopic.isPending ? "جاري النشر..." : "نشر الموضوع"}</Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">سجّل الدخول للمشاركة في النقاش.</p>}
          </div>
        </section>

        <section className="container py-12">
          <div className="mb-8 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-black">آخر النقاشات</h2><p className="mt-2 text-sm text-muted-foreground">أسئلة وتجارب يشاركها المتعلمون.</p></div><Button variant="ghost" size="icon" onClick={() => topicsQuery.refetch()} aria-label="تحديث النقاشات"><RefreshCw className={`h-4 w-4 ${topicsQuery.isFetching ? "animate-spin" : ""}`} /></Button></div>
          {topicsQuery.isLoading ? <div className="py-16 text-center text-muted-foreground">جاري تحميل النقاشات...</div> : topicsQuery.isError ? <Card><CardContent className="py-12 text-center text-destructive">تعذر تحميل المنتدى. حاول تحديث الصفحة.</CardContent></Card> : topicsQuery.data?.length ? <div className="grid gap-5">{topicsQuery.data.map((topic) => <TopicCard key={topic.id} topic={topic} isAuthenticated={isAuthenticated} />)}</div> : <Card className="border-dashed"><CardContent className="py-16 text-center"><MessageCircle className="mx-auto mb-4 h-10 w-10 text-primary/60" /><h3 className="mb-2 text-xl font-bold">لا توجد نقاشات بعد</h3><p className="text-muted-foreground">كن أول من يطرح سؤالاً مفيداً للمجتمع.</p></CardContent></Card>}
        </section>
      </main>
      <Footer />
    </div>
  );
}

type Topic = { id: number; userId: number; title: string; content: string; category: string; createdAt: Date };

function TopicCard({ topic, isAuthenticated }: { topic: Topic; isAuthenticated: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const utils = trpc.useUtils();
  const commentsQuery = trpc.forum.comments.useQuery({ topicId: topic.id }, { enabled: expanded });
  const createComment = trpc.forum.createComment.useMutation({
    onSuccess: async () => {
      await utils.forum.comments.invalidate({ topicId: topic.id });
      setComment("");
      toast.success("تمت إضافة تعليقك");
    },
    onError: (error) => toast.error(error.message || "تعذر إضافة التعليق"),
  });

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader><div className="flex items-start justify-between gap-4"><div className="min-w-0"><div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary"><Tag className="h-3 w-3" />{topic.category}</span><span className="inline-flex items-center gap-1"><UserRound className="h-3 w-3" />متعلم</span><time dateTime={new Date(topic.createdAt).toISOString()}>{new Date(topic.createdAt).toLocaleDateString("ar-SA")}</time></div><CardTitle className="truncate text-xl">{topic.title}</CardTitle><CardDescription className="mt-2 line-clamp-2 leading-7">{topic.content}</CardDescription></div><MessageCircle className="mt-1 h-6 w-6 shrink-0 text-primary" /></div></CardHeader>
      <CardContent><Button variant="outline" size="sm" onClick={() => setExpanded((value) => !value)}>{expanded ? "إخفاء التعليقات" : "عرض التعليقات"}</Button>{expanded && <div className="mt-5 space-y-4 border-t border-border pt-5"><div className="space-y-3">{commentsQuery.isLoading ? <p className="text-sm text-muted-foreground">جاري تحميل التعليقات...</p> : commentsQuery.data?.length ? commentsQuery.data.map((item) => <div key={item.id} className="rounded-xl bg-muted/50 p-3 text-sm leading-7"><p>{item.content}</p><span className="mt-2 block text-xs text-muted-foreground">متعلم · {new Date(item.createdAt).toLocaleDateString("ar-SA")}</span></div>) : <p className="text-sm text-muted-foreground">لا توجد تعليقات بعد.</p>}</div>{isAuthenticated ? <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); createComment.mutate({ topicId: topic.id, content: comment }); }}><Input value={comment} onChange={(event) => setComment(event.target.value)} minLength={2} maxLength={2000} required placeholder="اكتب تعليقاً مفيداً..." /><Button type="submit" size="icon" disabled={createComment.isPending} aria-label="إضافة التعليق"><Send className="h-4 w-4" /></Button></form> : <p className="text-sm text-muted-foreground">سجّل الدخول لإضافة تعليق.</p>}</div>}</CardContent>
    </Card>
  );
}
