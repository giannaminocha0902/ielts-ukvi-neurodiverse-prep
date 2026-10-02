import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Question {
  id: string
  text: string
  options?: string[]
  correctAnswer: string | number
  userAnswer?: string | number
  isCorrect?: boolean
  explanationCorrect?: string
  explanationIncorrect?: string
}

export interface PracticeSession {
  id: string
  moduleName: 'Reading' | 'Writing' | 'Listening' | 'Speaking'
  startedAt: string
  completedAt?: string
  questions: Question[]
  score: number
  totalPoints: number
  timeSpent: number
  completed: boolean
}

interface ProgressStore {
  sessions: PracticeSession[]
  currentSession: PracticeSession | null
  createSession: (moduleName: PracticeSession['moduleName']) => void
  endSession: () => void
  saveAnswer: (questionId: string, answer: string | number) => void
  getSessionHistory: () => PracticeSession[]
  getStatsByModule: (module: string) => {
    totalSessions: number
    averageScore: number
    totalTimeSpent: number
  }
  getTotalPoints: () => number
  getStreak: () => number
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSession: null,
      createSession: (moduleName) => {
        const newSession: PracticeSession = {
          id: crypto.randomUUID(),
          moduleName,
          startedAt: new Date().toISOString(),
          questions: [],
          score: 0,
          totalPoints: 0,
          timeSpent: 0,
          completed: false,
        }
        set({ currentSession: newSession })
      },
      endSession: () => {
        set((state) => {
          if (!state.currentSession) return state
          return {
            sessions: [...state.sessions, { ...state.currentSession, completed: true, completedAt: new Date().toISOString() }],
            currentSession: null,
          }
        })
      },
      saveAnswer: (questionId, answer) => {
        set((state) => {
          if (!state.currentSession) return state
          const updatedQuestions = state.currentSession.questions.map((q) => q.id === questionId ? { ...q, userAnswer: answer, isCorrect: q.correctAnswer === answer } : q)
          const score = updatedQuestions.filter((q) => q.isCorrect).length
          return {
            currentSession: {
              ...state.currentSession,
              questions: updatedQuestions,
              score,
            },
          }
        })
      },
      getSessionHistory: () => get().sessions,
      getStatsByModule: (module) => {
        const state = get()
        const moduleSessions = state.sessions.filter((s) => s.moduleName === module)
        return {
          totalSessions: moduleSessions.length,
          averageScore: moduleSessions.length ? moduleSessions.reduce((sum, s) => sum + s.score, 0) / moduleSessions.length : 0,
          totalTimeSpent: moduleSessions.reduce((sum, s) => sum + s.timeSpent, 0),
        }
      },
      getTotalPoints: () => get().sessions.reduce((sum, s) => sum + s.score, 0),
      getStreak: () => {
        const sessions = get().sessions
        if (!sessions.length) return 0

        const daySet = new Set(sessions.map((s) => new Date(s.startedAt).toDateString()))
        const sortedDays = Array.from(daySet).map((d) => new Date(d)).sort((a, b) => b.getTime() - a.getTime())

        let streak = 1
        for (let i = 1; i < sortedDays.length; i++) {
          const diffDays = Math.round((sortedDays[i - 1].getTime() - sortedDays[i].getTime()) / (1000 * 60 * 60 * 24))
          if (diffDays === 1) streak += 1
          else break
        }
        return streak
      },
    }),
    { name: 'progress-store' }
  )
)
