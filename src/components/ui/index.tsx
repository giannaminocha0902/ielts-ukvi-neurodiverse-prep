import clsx from 'clsx'
import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        {
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-blue-500':
            variant === 'primary',
          'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus-visible:outline-gray-500':
            variant === 'secondary',
          'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:outline-green-500':
            variant === 'success',
          'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:outline-red-500':
            variant === 'danger',
          'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 focus-visible:outline-gray-400':
            variant === 'neutral',
        },
        className
      )}
      {...props}
    />
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-2 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          'border-gray-300 dark:border-gray-600',
          'hover:border-gray-400 dark:hover:border-gray-500',
          'focus:border-blue-500 dark:focus:border-blue-400',
          error && 'border-red-500 dark:border-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string | number; label: string }[]
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={clsx(
          'w-full px-4 py-2 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          'border-gray-300 dark:border-gray-600',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        {...props}
      />
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  )
}
