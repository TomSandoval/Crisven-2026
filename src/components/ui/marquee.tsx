'use client'

import React from 'react'

interface MarqueeProps {
  children: React.ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  speed?: number
  className?: string
}

export default function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  speed = 5,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        overflow: 'hidden',
        width: '100vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '20px',
          animation: `marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
          animationPlayState: 'running',
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
          }
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
          }
        }}
      >
        {/* Duplicamos dos veces para el loop infinito */}
        {children}
        {children}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}