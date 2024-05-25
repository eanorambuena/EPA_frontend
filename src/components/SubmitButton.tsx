import React from "react"

interface Props {
  className?: string
  children: React.ReactNode
}

export default function SubmitButton({ className, children }: Props) {
  return (
    <button
      className={`bg-violet-500 rounded-md px-4 py-2 text-white hover:scale-105 ${className}`}
      type='submit'
    >
      {children}
    </button>
  )
}
