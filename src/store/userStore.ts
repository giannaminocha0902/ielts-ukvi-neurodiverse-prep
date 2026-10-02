import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  id: string
  name: string
  neurodivergentTypes: ('ADHD' | 'OCD' | 'Dyslexia' | 'Autism')[]
  targetBand: number // 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0
  testDate: string | null
  streakCount: number
  totalPoints: number
  createdAt: string
}

interface Settings {
  darkMode: boolean
  dyslexiaFriendly: boolean
  highContrast: boolean
  reducedMotion: boolean
  timerLength: number // minutes per session
  allowAnswerChecks: number // for OCD management
  breakAfterMinutes: number // ADHD timer management
  fontSize: 'small' | 'normal' | 'large'
}

interface UserStore {
  profile: UserProfile | null
  settings: Settings
  
  // Profile actions
  createProfile: (name: string, types: string[], targetBand: number) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  
  // Settings actions
  updateSettings: (updates: Partial<Settings>) => void
  toggleDarkMode: () => void
  toggleDyslexiaFriendly: () => void
  toggleHighContrast: () => void
  
  // Streak actions
  addStreak: () => void
  resetStreak: () => void
}

const defaultSettings: Settings = {
  darkMode: true,
  dyslexiaFriendly: false,
  highContrast: false,
  reducedMotion: false,
  timerLength: 25,
  allowAnswerChecks: 2,
  breakAfterMinutes: 25,
  fontSize: 'normal',
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      settings: defaultSettings,
      
      createProfile: (name, types, targetBand) => {
        set({
          profile: {
            id: crypto.randomUUID(),
            name,
            neurodivergentTypes: types as any,
            targetBand,
            testDate: null,
            streakCount: 0,
            totalPoints: 0,
            createdAt: new Date().toISOString(),
          },
        })
      },
      
      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }))
      },
      
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }))
      },
      
      toggleDarkMode: () => {
        set((state) => ({
          settings: { ...state.settings, darkMode: !state.settings.darkMode },
        }))
      },
      
      toggleDyslexiaFriendly: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            dyslexiaFriendly: !state.settings.dyslexiaFriendly,
          },
        }))
      },
      
      toggleHighContrast: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            highContrast: !state.settings.highContrast,
          },
        }))
      },
      
      addStreak: () => {
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, streakCount: state.profile.streakCount + 1 }
            : null,
        }))
      },
      
      resetStreak: () => {
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, streakCount: 0 }
            : null,
        }))
      },
    }),
    {
      name: 'user-store',
    }
  )
)
