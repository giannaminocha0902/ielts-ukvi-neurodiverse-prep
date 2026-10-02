import { useState } from 'react'
import { useUserStore } from '../store/userStore'
import { Button, Card } from '../components/ui'
import * as Icons from 'lucide-react'

export function DailyGoal() {
  const profile = useUserStore((state) => state.profile)
  const sessions = useProgressStore((state) => state.sessions)

  const today = new Date().toDateString()
  const todaySessions = sessions.filter((s) => new Date(s.startedAt).toDateString() === today)
  const dailyGoal = 3
  const progress = Math.min(todaySessions.length, dailyGoal)
  const percentage = (progress / dailyGoal) * 100

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Today's Goal</h2>
          {progress >= dailyGoal && <Icons.CheckCircle2 className="w-8 h-8 text-green-600" />}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{progress} of {dailyGoal} sessions</span>
            <span className="text-gray-600 dark:text-gray-400">{Math.round(percentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all" style={{ width: `${percentage}%` }} />
          </div>
        </div>
        {profile && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Icons.Flame className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-900 dark:text-yellow-100">{profile.streakCount} day streak</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export function ModuleSelector({ onSelectModule }: { onSelectModule: (module: 'Reading' | 'Writing' | 'Listening' | 'Speaking') => void }) {
  const createSession = useProgressStore((state) => state.createSession)
  const sessions = useProgressStore((state) => state.sessions)

  const modules = [
    { id: 'Reading' as const, name: 'Reading', icon: Icons.BookOpen, description: 'Reading tasks', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', button: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'Writing' as const, name: 'Writing', icon: Icons.PenTool, description: 'Writing tasks', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300', button: 'bg-purple-600 hover:bg-purple-700' },
    { id: 'Listening' as const, name: 'Listening', icon: Icons.Headphones, description: 'Listening tasks', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', button: 'bg-green-600 hover:bg-green-700' },
    { id: 'Speaking' as const, name: 'Speaking', icon: Icons.Mic, description: 'Speaking tasks', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300', button: 'bg-orange-600 hover:bg-orange-700' },
  ]

  const getStats = (moduleName: string) => {
    const moduleSessions = sessions.filter((s) => s.moduleName === moduleName)
    return { completed: moduleSessions.filter((s) => s.completed).length, total: moduleSessions.length }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modules.map((module) => {
        const Icon = module.icon
        const stats = getStats(module.id)
        return (
          <Card key={module.id} className="flex flex-col justify-between">
            <div className="mb-4">
              <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-1">{module.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{module.description}</p>
              {stats.total > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-500">{stats.completed} of {stats.total} completed</p>
              )}
            </div>
            <Button
              onClick={() => {
                createSession(module.id)
                onSelectModule(module.id)
              }}
              className={`w-full text-white ${module.button}`}
            >
              Start Practice
            </Button>
          </Card>
        )
      })}
    </div>
  )
}

export function SessionHistory() {
  const sessions = useProgressStore((state) => state.sessions)

  if (sessions.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <Icons.BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No sessions yet. Start practicing!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Sessions</h2>
        <div className="space-y-3">
          {sessions.slice(-5).reverse().map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div>
                <p className="font-semibold">{session.moduleName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(session.startedAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{session.score}/{session.totalPoints}</p>
                <p className="text-xs text-gray-500">{Math.floor(session.timeSpent / 60)}m</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
