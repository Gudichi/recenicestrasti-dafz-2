import { LastLessonCard } from "@/components/last-lesson-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllModules } from "@/lib/content";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function PortalPage() {
  const modules = await getAllModules();

  return (
    <div className="space-y-8 py-2 md:py-8">
      {/* Hero Card */}
      <Card className="bg-white border-[#F5E5E0] shadow-sm overflow-hidden">
        <CardContent className="p-12 lg:p-16 text-center relative">
          <h1 className="font-serif text-5xl lg:text-6xl text-[#8B4566] mb-6 leading-tight">
            Dobrodošla!
          </h1>
          <p className="font-body text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed mb-8">
            Nastavi svoje putovanje kroz program Rečenice Strasti i otkrij snagu
            riječi u intimnosti
          </p>

          {/* Current Lesson Box */}
          <div className="max-w-2xl mx-auto md:mb-8">
            <LastLessonCard modules={modules} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, i) => (
          <Link
            key={i}
            href={`/portal/modul/${module.slug}`}
            className="group block h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
          >
            <Card
              className={cn(
                "bg-white border-[#F5E5E0] border-2 shadow-sm h-full",
                module.slug.includes("bonus") ? "border-dashed" : "border-solid"
              )}
            >
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-lg text-[#8B4566]">
                    {module.title}
                  </h3>
                  <Badge
                    className="uppercase text-xs bg-accent/10 text-accent font-medium px-2 py-1"
                    variant="outline"
                  >
                    {module.slug.includes("bonus")
                      ? "🎁 Bonus"
                      : module.slug.replace("-", " ")}
                  </Badge>
                </div>
                <p className="font-body text-[#2C2C2C] text-sm">
                  {module.description}
                </p>
                <p className="font-body text-accent font-bold text-sm">
                  {module.lessons.length} lekcij
                  {module.lessons.length === 1 ? "a" : "e"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
