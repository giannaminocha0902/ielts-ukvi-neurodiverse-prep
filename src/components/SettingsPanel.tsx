import { useUserStore } from '../store/userStore'
import { Button, Card, Input, Select, Checkbox } from '../components/ui'
import * as Icons from 'lucide-react'

export default function SettingsPanel() {
  const settings = useUserStore((state) => state.settings)
  const updateSettings = useUserStore((state) => state.updateSettings)
  const toggleDarkMode = useUserStore((state) => state.toggleDarkMode)
  const toggleDyslexiaFriendly = useUserStore((state) => state.toggleDyslexiaFriendly)
  const toggleHighContrast = useUserStore((state) => state.toggleHighContrast)

  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Icons.Settings className="w-6 h-6" />Accessibility Settings</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Theme</h3>
          <Checkbox label="Dark Mode" checked={settings.darkMode} onChange={toggleDarkMode} />
          <Checkbox label="High Contrast" checked={settings.highContrast} onChange={toggleHighContrast} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Font</h3>
          <Checkbox label="Dyslexia-Friendly Font" checked={settings.dyslexiaFriendly} onChange={toggleDyslexiaFriendly} />
          <Select
            label="Text Size"
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value as 'small' | 'normal' | 'large' })}
            options={[
              { value: 'small', label: 'Small' },
              { value: 'normal', label: 'Normal' },
              { value: 'large', label: 'Large' },
            ]}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Study Timer</h3>
          <Input type="number" label="Focus Session Length" value={settings.timerLength} onChange={(e) => updateSettings({ timerLength: Number(e.target.value) })} min={5} max={60} />
          <Input type="number" label="Break After" value={settings.breakAfterMinutes} onChange={(e) => updateSettings({ breakAfterMinutes: Number(e.target.value) })} min={1} max={30} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">OCD-Friendly Controls</h3>
          <Input type="number" label="Max Answer Checks" value={settings.allowAnswerChecks} onChange={(e) => updateSettings({ allowAnswerChecks: Number(e.target.value) })} min={1} max={5} />
        </div>
      </div>
    </Card>
  )
}
