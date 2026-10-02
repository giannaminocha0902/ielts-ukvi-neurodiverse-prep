import { useState } from 'react'
import { useUserStore } from '../../store/userStore'
import { useProgressStore } from '../../store/progressStore'
import { Button, Card, Input, Select, Checkbox } from '../ui'
import * as Icons from 'lucide-react'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [targetBand, setTargetBand] = useState('6.0')
  const createProfile = useUserStore((state) => state.createProfile)

  const neurodivergentTypes = [
    { id: 'ADHD', label: 'ADHD' },
    { id: 'OCD', label: 'OCD' },
    { id: 'Dyslexia', label: 'Dyslexia' },
    { id: 'Autism', label: 'Autism Spectrum' },
  ]

  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleContinue = () => {
    if (step === 1 && name.trim()) {
      setStep(2)
    } else if (step === 2 && selectedTypes.length > 0) {
      setStep(3)
    } else if (step === 3) {
      createProfile(name, selectedTypes, Number(targetBand))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">IELTS UKVI Prep</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Neurodivergent-friendly preparation
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-all ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What should we call you?</h2>
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What applies to you?</h2>
              <div className="space-y-3">
                {neurodivergentTypes.map((type) => (
                  <Checkbox
                    key={type.id}
                    label={type.label}
                    checked={selectedTypes.includes(type.id)}
                    onChange={() => handleToggleType(type.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What is your target band?</h2>
              <Select
                label="Target IELTS Band"
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                options={[
                  { value: '4.5', label: '4.5' },
                  { value: '5.0', label: '5.0' },
                  { value: '5.5', label: '5.5' },
                  { value: '6.0', label: '6.0' },
                  { value: '6.5', label: '6.5' },
                  { value: '7.0', label: '7.0' },
                  { value: '7.5', label: '7.5' },
                  { value: '8.0', label: '8.0' },
                ]}
              />
            </div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={(step === 1 && !name.trim()) || (step === 2 && selectedTypes.length === 0)}
              className="flex-1"
            >
              {step === 3 ? 'Get Started' : 'Continue'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
