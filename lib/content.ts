export interface Lesson {
  slug: string;
  title: string;
  content: string;
  module: string;
}

export interface Module {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

// Function to read markdown content (server-side only)
async function readMarkdownContent(
  moduleSlug: string,
  lessonSlug: string
): Promise<string> {
  if (typeof window !== "undefined") {
    // Client-side fallback
    return `# ${lessonSlug}\n\nSadržaj se učitava...`;
  }

  try {
    const fs = await import("fs");
    const path = await import("path");
    const contentPath = path.join(
      process.cwd(),
      "content",
      moduleSlug,
      `${lessonSlug}.md`
    );
    return fs.readFileSync(contentPath, "utf8");
  } catch (error) {
    console.error(
      `Error reading content for ${moduleSlug}/${lessonSlug}:`,
      error
    );
    return `# ${lessonSlug}\n\nSadržaj nije dostupan.`;
  }
}

// Static module definitions (without content)
const moduleDefinitions = [
  {
    slug: "modul-1",
    title: "Uvod u Rečenice Strasti",
    description: "Osnovni koncepti i snaga riječi",
    lessons: [
      {
        slug: "lekcija-1",
        title: "Una & Gabriel",
        module: "modul-1",
      },
      {
        slug: "lekcija-2",
        title: "Tko je Bono i zašto ga slušati?",
        module: "modul-1",
      },
      {
        slug: "lekcija-3",
        title: "Psihologija Dopamina (Što Stvarno Pokreće Privlačnost)",
        module: "modul-1",
      },
      {
        slug: "lekcija-4",
        title: "Zašto Se Muškarci Udaljavaju (Istina Koju Nitko Ne Govori)",
        module: "modul-1",
      },
    ],
  },
  {
    slug: "modul-2",
    title: "Komunikacija u Strasti",
    description: "Kako otvoreno komunicirati o željama i granicama",
    lessons: [
      {
        slug: "lekcija-1",
        title: "Osnovni Principi Komunikacije",
        module: "modul-2",
      },
    ],
  },
  {
    slug: "modul-3",
    title: "Timing & Kontekst",
    description: "Kad reći pravu stvar u pravo vrijeme",
    lessons: [
      {
        slug: "lekcija-1",
        title: "Kada koristiti koju rečenicu",
        module: "modul-3",
      },
      {
        slug: "lekcija-2",
        title: "Kako čitati njegove odgovore",
        module: "modul-3",
      },
      {
        slug: "lekcija-3",
        title: "Red Flags - Kad apsolutno NE koristiti rečenice",
        module: "modul-3",
      },
      {
        slug: "lekcija-4",
        title: "Troubleshooting - Što kad krene po zlu",
        module: "modul-3",
      },
      {
        slug: "lekcija-5",
        title: "Master Decision Tree",
        module: "modul-3",
      },
    ],
  },
  {
    slug: "modul-4",
    title: "Napredne Strategije",
    description: "Majstorstvo kombinacija & Long-Game strategija",
    lessons: [
      {
        slug: "lekcija-0",
        title: "Uvod u Napredne Strategije",
        module: "modul-4",
      },
      {
        slug: "lekcija-1",
        title: "Kombiniranje rečenica za maksimalni efekt",
        module: "modul-4",
      },
      {
        slug: "lekcija-2",
        title: "Push-Pull tehnika - Umjetnost emocionalne rollercoastera",
        module: "modul-4",
      },
      {
        slug: "lekcija-3",
        title: "Održavanje momentum - Long-Game strategija",
        module: "modul-4",
      },
    ],
  },
  {
    slug: "bonus-1",
    title: "Bonus 1: Znakovi Strasti",
    description: "Kako prepoznati je li stvarno zaljubljen",
    lessons: [
      {
        slug: "lekcija-0",
        title: "Uvod u Znakove Strasti",
        module: "bonus-1",
      },
      {
        slug: "lekcija-1",
        title: "Kako prepoznati je li zaljubljen",
        module: "bonus-1",
      },
      {
        slug: "lekcija-2",
        title: "Body language signali",
        module: "bonus-1",
      },
      {
        slug: "lekcija-3",
        title: "Tekstualni signali",
        module: "bonus-1",
      },
    ],
  },
  {
    slug: "bonus-3",
    title: "Bonus 3: Seksualna Opsesija",
    description: "Kako muškarca učiniti seksualno opsjednutim",
    lessons: [
      {
        slug: "lekcija-0",
        title: "Uvod u Seksualnu Opsesiju",
        module: "bonus-3",
      },
      {
        slug: "lekcija-1",
        title: "Psihologija muške seksualnosti",
        module: "bonus-3",
      },
      {
        slug: "lekcija-2",
        title: "Seksualne poruke koje ga aktiviraju",
        module: "bonus-3",
      },
      {
        slug: "lekcija-3",
        title: "Timing - kada eskalirati",
        module: "bonus-3",
      },
      {
        slug: "lekcija-4",
        title: "Održavanje seksualne napetosti (Long-Game)",
        module: "bonus-3",
      },
    ],
  },
  {
    slug: "bonus-2",
    title: "Bonus 2: Razotkrivanje Muškog Uma",
    description:
      "Kako razumjeti muškarca, zašto se udaljava, i što on zaista želi",
    lessons: [
      {
        slug: "lekcija-0",
        title: "Uvod: Zašto ova knjiga postoji",
        module: "bonus-2",
      },
      {
        slug: "lekcija-1",
        title: "Kako muški mozak radi (i zašto je drugačiji)",
        module: "bonus-2",
      },
      {
        slug: "lekcija-2",
        title: "Poglavlje trenutno nedostupno",
        module: "bonus-2",
      },
      {
        slug: "lekcija-3",
        title: "Zašto neki muškarci bježe, a drugi ostaju",
        module: "bonus-2",
      },
      {
        slug: "lekcija-4",
        title: "Dešifriranje najčešćeg ženskog nightmare-a",
        module: "bonus-2",
      },
      {
        slug: "lekcija-5",
        title: "Najvažniji Red/Green Flag Test koji ćeš ikad napraviti",
        module: "bonus-2",
      },
    ],
  },
];

export async function getModule(slug: string): Promise<Module | undefined> {
  const moduleDef = moduleDefinitions.find((m) => m.slug === slug);
  if (!moduleDef) return undefined;

  const lessons = await Promise.all(
    moduleDef.lessons.map(async (lesson) => ({
      ...lesson,
      content: await readMarkdownContent(moduleDef.slug, lesson.slug),
    }))
  );

  return {
    slug: moduleDef.slug,
    title: moduleDef.title,
    description: moduleDef.description,
    lessons,
  };
}

export function getLessonNumbering(lesson: Lesson): string {
  const moduleNumber = lesson.module.split("-")[1] || "1";
  const lessonNumber = lesson.slug.split("-")[1] || "1";
  return `${moduleNumber}.${lessonNumber}.`;
}

export async function getLesson(
  moduleSlug: string,
  lessonSlug: string
): Promise<Lesson | undefined> {
  const moduleData = await getModule(moduleSlug);
  return moduleData?.lessons.find((l) => l.slug === lessonSlug);
}

export async function getAllModules(): Promise<Module[]> {
  return Promise.all(
    moduleDefinitions.map(async (moduleDef) => {
      const lessons = await Promise.all(
        moduleDef.lessons.map(async (lesson) => ({
          ...lesson,
          content: await readMarkdownContent(moduleDef.slug, lesson.slug),
        }))
      );

      return {
        slug: moduleDef.slug,
        title: moduleDef.title,
        description: moduleDef.description,
        lessons,
      };
    })
  );
}
