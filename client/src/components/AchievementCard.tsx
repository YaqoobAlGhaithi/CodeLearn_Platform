import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description?: string;
  icon?: string;
  points?: number;
  earned?: boolean;
}

export default function AchievementCard({
  title,
  description,
  icon = "🏆",
  points = 0,
  earned = false,
}: AchievementCardProps) {
  return (
    <Card
      className={`border-border text-center transition-all ${
        earned
          ? "bg-gradient-to-br from-accent/10 to-primary/10 border-accent/50"
          : "opacity-50"
      }`}
    >
      <CardHeader>
        <div className="text-4xl mb-4">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-2">
          <Award className="h-4 w-4 text-accent" />
          <span className="font-semibold text-sm">{points} نقطة</span>
        </div>
        {earned && (
          <p className="text-xs text-accent font-semibold mt-2">✓ مكتسب</p>
        )}
      </CardContent>
    </Card>
  );
}
