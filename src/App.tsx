import { useEffect, useState } from 'react'
import { useUserStore } from './store/userStore'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

function App() {
  const profile = useUserStore((state) => state.profile)
  const settings = useUserStore((state) => state.settings)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    document.documentElement.classList.toggle('dark', settings.darkMode)
    document.body.classList.toggle('dyslexic-mode', settings.dyslexiaFriendly)
    document.body.classList.toggle('high-contrast-mode', settings.highContrast)
    document.documentElement.classList.toggle('reduce-motion', settings.reducedMotion)

    const fontSizeMap = {
      small: '14px',
      normal: '16px',
      large: '18px',
    }
    document.documentElement.style.fontSize = fontSizeMap[settings.fontSize]
  }, [settings])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      {!profile ? <Onboarding /> : <Dashboard />}
    </div>
  )
}

export default App
