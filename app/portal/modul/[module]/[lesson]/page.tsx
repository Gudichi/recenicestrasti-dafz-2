import { LastLessonManager } from "@/components/last-lesson-manager";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getLesson, getModule } from "@/lib/content";
import Link from "next/link";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function LessonPage({
  params,
}: {
  params: { module: string; lesson: string };
}) {
  const { module, lesson } = await params;

  const m = await getModule(module);
  const l = await getLesson(module, lesson);

  if (!m || !l) {
    redirect("/portal");
  }

  const lessonIndex = m?.lessons.findIndex((les) => les.slug === lesson) ?? -1;
  const nextLesson =
    lessonIndex + 1 < (m?.lessons.length ?? 0)
      ? m?.lessons[lessonIndex + 1]
      : null;

  return (
    <div className="space-y-6 py-2 md:py-8 max-w-3xl mx-auto text-lg md:text-xl">
      <LastLessonManager module={m} lesson={l} />
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
              <Link href={`/portal/modul/${m?.slug}`}>{m?.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/portal/modul/${l?.module}/${l?.slug}`}>
                {l?.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-serif italic font-medium text-4xl lg:text-5xl pb-2 text-[#8B4566] leading-snug">
        {l?.title}
      </h1>
      <Markdown remarkPlugins={[remarkGfm]}>{l?.content || ""}</Markdown>

      <div className="flex justify-center items-center">
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl mt-4">
          <Link
            href={
              nextLesson
                ? `/portal/modul/${m?.slug}/${nextLesson.slug}`
                : "/portal"
            }
          >
            {nextLesson ? "Sljedeća lekcija →" : "← Natrag na program"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
