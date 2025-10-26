"use client";

import { getLessonNumbering, Module } from "@/lib/content";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export const LastLessonCard = ({ modules }: { modules: Module[] }) => {
  const [lastLesson, setLastLesson] = useState<{
    num: string;
    module: string;
    lesson: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const lastLesson = localStorage.getItem("lastLesson");
    if (lastLesson) {
      setLastLesson(JSON.parse(lastLesson));
    } else {
      const firstLesson = modules[0]?.lessons[0];
      setLastLesson({
        num: getLessonNumbering(firstLesson!),
        module: modules[0]?.slug,
        lesson: firstLesson?.slug,
        title: firstLesson?.title,
      });
    }
  }, []);

  if (!lastLesson) return null;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-[#F5E5E0] shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="w-12 h-12 bg-[#FF6B9D]/10 rounded-xl flex items-center justify-center">
              <span className="text-xl">📖</span>
            </div>
            <div className="space-y-1 sm:text-left">
              <h3 className="font-display text-lg text-[#8B4566] mb-1">
                Lekcija na kojoj si stala
              </h3>
              <p className="font-body text-[#2C2C2C] text-sm">
                {lastLesson?.num} {lastLesson?.title}
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="shadow-md">
            <a
              href={`/portal/modul/${lastLesson?.module}/${lastLesson?.lesson}`}
            >
              Nastavi gdje si stala
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
