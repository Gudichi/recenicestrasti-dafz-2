'use client'

import { LessonHeader } from '@/components/lesson/lesson-header'
import { useProgress } from '@/lib/hooks/useProgress'
import { useEffect, useState } from 'react'
import { getCurrentUser, isAuthenticated } from '@/lib/auth'

interface LessonPageClientProps {
  children: React.ReactNode
  currentLesson: number
  totalLessons: number
  nextLessonHref: string | null
  nextLessonText: string
}

export function LessonPageClient({ children, currentLesson, totalLessons }: LessonPageClientProps) {
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const { setTotalLessons } = useProgress()

  useEffect(() => {
    const loadUser = () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    }

    loadUser()

    // Listen for auth changes
    const handleStorageChange = () => {
      loadUser()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Check auth every 5 seconds
    const interval = setInterval(loadUser, 5000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      window.location.href = '/login'
    }
  }, [user, loading])

  useEffect(() => {
    // Set total lessons
    setTotalLessons(totalLessons)
  }, [totalLessons, setTotalLessons])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5EE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-body text-[#2C2C2C]">Učitavanje...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FFF5EE] relative">
      <LessonHeader 
        currentLesson={currentLesson}
        totalLessons={totalLessons}
        onBack={() => window.history.back()}
        isBookmarked={false}
        onBookmark={() => {}}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
