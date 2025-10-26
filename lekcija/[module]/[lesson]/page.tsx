import { getLesson, getModule, routes, getAllModules } from '@/lib/content'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { LessonPageClient } from './lesson-page-client'
import { ProgressButtons } from '@/components/lesson/progress-buttons'
import { ProgressBar } from '@/components/ui/progress-bar'

// Generate static params for all lessons
export async function generateStaticParams() {
  const allModules = await getAllModules()
  const params = []
  
  for (const moduleItem of allModules) {
    for (const lesson of moduleItem.lessons) {
      params.push({
        module: moduleItem.slug,
        lesson: lesson.slug,
      })
    }
  }
  
  return params
}

interface LessonPageProps {
  params: Promise<{
    module: string
    lesson: string
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { module, lesson } = await params
  const [lessonData, moduleData, allModules] = await Promise.all([
    getLesson(module, lesson),
    getModule(module),
    getAllModules()
  ])
  
  if (!lessonData || !moduleData) {
    notFound()
  }

  // Find next lesson
  const currentModuleIndex = allModules.findIndex(m => m.slug === module)
  const currentLessonIndex = moduleData.lessons.findIndex(l => l.slug === lesson)
  
  let nextLessonHref: string | null = null
  let nextLessonText = 'Nazad na modul'
  
  if (currentLessonIndex < moduleData.lessons.length - 1) {
    // Next lesson in same module
    const nextLesson = moduleData.lessons[currentLessonIndex + 1]
    nextLessonHref = routes.lesson(module, nextLesson.slug)
    nextLessonText = 'Prijeđi na sljedeću lekciju'
  } else if (currentModuleIndex < allModules.length - 1) {
    // First lesson of next module
    const nextModule = allModules[currentModuleIndex + 1]
    const firstLesson = nextModule.lessons[0]
    nextLessonHref = routes.lesson(nextModule.slug, firstLesson.slug)
    nextLessonText = 'Prijeđi na sljedeći modul'
  }

  // Calculate module-level progress
  const moduleTotalLessons = moduleData.lessons.length
  const currentLessonNumber = currentLessonIndex + 1

  return (
    <LessonPageClient 
      currentLesson={currentLessonNumber} 
      totalLessons={moduleTotalLessons}
      nextLessonHref={nextLessonHref}
      nextLessonText={nextLessonText}
    >
      <main className="pb-32">
          {/* Cover Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80" 
              alt={lessonData.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="px-8 py-4">
            <ProgressBar 
              totalLessons={moduleTotalLessons}
              moduleSlug={module}
              size="sm"
              className="bg-white/80 backdrop-blur-sm rounded-lg p-3"
            />
          </div>
          
          {/* Content Container */}
          <article className="px-8 py-12">
                {/* ZADATAK Badge */}
                <span className="inline-block bg-[#FFD93D] text-[#2C2C2C] font-heading text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded mb-4">
                  ZADATAK
                </span>
                
                {/* Divider */}
                <div className="w-16 h-1 bg-[#FF6B9D] rounded-full mb-8"></div>
            
            {/* Main Content - Markdown */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-display text-4xl lg:text-5xl text-[#8B4566] mb-6 leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-heading text-2xl font-semibold text-[#2C2C2C] mt-12 mb-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-heading text-xl font-semibold text-[#2C2C2C] mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-heading font-semibold text-[#2C2C2C]">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-[#6B6B6B]">
                      {children}
                    </em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="font-body text-lg italic text-[#6B6B6B] border-l-4 border-[#8B4566] pl-6 my-8">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-3 mb-6">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-3 mb-6">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="font-body text-lg leading-relaxed text-[#2C2C2C]">
                      {children}
                    </li>
                  ),
                  hr: () => (
                    <hr className="border-[#F5E5E0] my-12" />
                  )
                }}
              >
                {lessonData?.content || 'Sadržaj se učitava...'}
              </ReactMarkdown>
            </div>
          </article>
        </main>
        
        {/* Progress Buttons */}
        <ProgressButtons
          moduleSlug={module}
          lessonSlug={lesson}
          nextLessonHref={nextLessonHref}
          nextLessonText={nextLessonText}
        />
    </LessonPageClient>
  )
}
