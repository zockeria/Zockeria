'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./components/Map'), { ssr: false })

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [screen, setScreen] = useState('intro')

  if (screen === 'intro') {
    return (
      <div style={{
        width: '100vw', height: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d2137 100%)',
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
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite`
          }} />
        ))}

        {/* Fliegender Teppich Animation */}
        <div style={{
          fontSize: '80px',
          animation: 'float 3s ease-in-out infinite',
          marginBottom: '20px',
          filter: 'drop-shadow(0 0 20px #e94560)'
        }}>
          🪄
        </div>

        {/* Logo */}
        <h1 style={{
          fontSize: '64px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #e94560, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          ZOCKERIA
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#a0aec0',
          marginBottom: '50px',
          fontStyle: 'italic'
        }}>
          Wo Gaming zur Lebensweise wird.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', width: '280px' }}>
          <button
            onClick={() => setScreen('community')}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #e94560, #c0392b)',
              border: 'none',
