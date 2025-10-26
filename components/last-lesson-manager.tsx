"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import { getLessonNumbering, Lesson, Module } from "@/lib/content";

export const LastLessonManager = ({
  module,
  lesson,
}: {
  module: Module;
  lesson: Lesson;
}) => {
  useEffectOnce(() => {
    localStorage.setItem(
      "lastLesson",
      JSON.stringify({
        num: getLessonNumbering(lesson!),
        module: module.slug,
        lesson: lesson?.slug,
        title: lesson?.title,
      })
    );
  });

  return null;
};
