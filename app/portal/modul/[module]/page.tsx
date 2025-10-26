import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getModule } from "@/lib/content";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ModulePage({
  params,
}: {
  params: { module: string };
}) {
  const p = await params;
  const module = await getModule(p.module);

  if (!module) {
    redirect("/portal");
  }
  
  return (
    <div className="space-y-6 py-2 md:py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portal">Početna</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/portal/modul/${module?.slug}`}>
                {module?.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Module Header */}
      <Card className="mb-24 bg-white border-[#F5E5E0] shadow-xl overflow-hidden">
        <CardContent className="p-12 lg:p-16 text-center relative">
          <h1 className="font-serif italic text-4xl lg:text-6xl mb-8 text-[#8B4566]">
            {module?.title}
          </h1>
          <p className="font-body text-xl lg:text-2xl text-[#2C2C2C] max-w-3xl mx-auto leading-relaxed mb-10">
            {module?.description}
          </p>
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl">
            <Link
              href={`/portal/modul/${module?.slug}/${module?.lessons[0]?.slug}`}
            >
              Započni modul →
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Lessons Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="font-display text-2xl lg:text-3xl text-[#8B4566] py-6">
            Lekcije u ovom modulu
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FF6B9D] to-[#8B4566] rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {module?.lessons.map((lesson, i) => (
            <Link
              key={i}
              href={`/portal/modul/${module.slug}/${lesson.slug}`}
              className="group block h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <Card
                className={
                  "bg-white border-[#F5E5E0] border-2 shadow-sm h-full"
                }
              >
                <CardContent className="p-6 space-y-4 flex items-center h-full">
                  <h3 className="text-lg text-[#8B4566]">
                    {i + 1}. {lesson.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to Portal */}
      <div className="text-center mt-16">
        <Button asChild>
          <Link href={"/portal"}>← Natrag na program</Link>
        </Button>
      </div>
    </div>
  );
}
