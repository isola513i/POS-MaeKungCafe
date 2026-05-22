"use client"

import { useEffect, useState } from 'react'

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!now) {
    return <div className="text-3xl font-bold text-white tabular-nums">--:--:--</div>
  }

  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const date = now.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })

  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="text-3xl font-bold text-white tabular-nums tracking-wide">
        {time}
      </span>
      <span className="text-sm text-zinc-400 font-medium">{date}</span>
    </div>
  )
}

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-40 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              MaeKung Kitchen Dashboard
            </h1>
          </div>
          <LiveClock />
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
