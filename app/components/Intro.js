'use client'
import { useState, useEffect } from 'react'

export default function Intro({ onSkip }) {
  const [countdown, setCountdown] = useState(10)
  const [animStep, setAnimStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); onSkip(); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const steps = [0, 1, 2, 3]
    steps.forEach(s => setTimeout(() => setAnimStep(s), s * 2500))
  }, [])

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d2818 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>

      {/* Sterne Hintergrund */}
      {[...Array(50)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          background: '#fff',
          borderRadius: '50%',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle ${Math.random() * 2 + 1}s infinite alternate`
        }} />
      ))}

      {/* Tropische Insel */}
      <div style={{
        position: 'absolute', bottom: '10%',
        fontSize: '120px', filter: 'drop-shadow(0 0 30px rgba(0,200,100,0.4))',
        animation: 'float 3s ease-in-out infinite',
        opacity: animStep >= 0 ? 1 : 0, transition: 'opacity 1s'
      }}>
        🏝️
      </div>

      {/* Fliegender Teppich */}
      <div style={{
        fontSize: '80px',
        animation: 'flyIn 2s ease-out forwards',
        opacity: animStep >= 1 ? 1 : 0,
        transition: 'opacity 0.5s',
        marginBottom: '20px'
      }}>
        🪄✨
      </div>

      {/* Avatare springen */}
      {animStep >= 2 && (
