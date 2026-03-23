'use client'

import { useEffect, useState } from 'react'

export default function Intro({ onFinish }) {
  const [skip, setSkip] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 2500)
    const t3 = setTimeout(() => setPhase(3), 5000)
    const t4 = setTimeout(() => setPhase(4), 7500)
    const t5 = setTimeout(() => onFinish(), 10000)
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (skip) onFinish()
  }, [skip])

  const avatars = [
    { emoji: '⚔️', name: 'Krieger', delay: '0s', left: '15%' },
    { emoji: '🧙', name: 'Magier', delay: '0.3s', left: '30%' },
    { emoji: '🎮', name: 'Gamer', delay: '0.6s', left: '50%' },
    { emoji: '💰', name: 'Boss', delay: '0.9s', left: '65%' },
    { emoji: '🎤', name: 'Streamer', delay: '1.2s', left: '80%' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(180deg, #0a1628 0%, #1a0a2e 50%, #0a1a0a 100%)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center'
    }}>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes carpetIn {
          from { transform: translateX(-120%) rotate(-5deg); opacity: 0; }
          to { transform: translateX(0%) rotate(-2deg); opacity: 1; }
        }
        @keyframes jump {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          30% { transform: translateY(-40px) scale(1.2); opacity: 1; }
          100% { transform: translateY(400px) scale(0.8); opacity: 0; }
        }
        @keyframes parachute {
          0% { transform: translateY(-200px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(300px); opacity: 1; }
        }
        @keyframes titleIn {
          from { transform: scale(0.5) translateY(30px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes islandFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cloudMove {
          from { transform: translateX(-100px); }
          to { transform: translateX(100vw); }
        }
        @keyframes star {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(233,69,96,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(233,69,96,0); }
        }
      `}</style>

      {/* STERNE */}
      {Array.from({length: 30}).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 3 === 0 ? '3px' : '2px',
          height: i % 3 === 0 ? '3px' : '2px',
          background: '#fff',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          animation: `star ${1 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: 0.6
        }} />
      ))}

      {/* WOLKEN */}
      {phase >= 1 && [
        { top: '15%', duration: '12s', delay: '0s', size: 60 },
        { top: '25%', duration: '18s', delay: '3s', size: 40 },
        { top: '10%', duration: '15s', delay: '6s', size: 50 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: c.top,
          width: `${c.size}px`,
          height: `${c.size * 0.5}px`,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '50px',
          animation: `cloudMove ${c.duration} linear infinite`,
          animationDelay: c.delay
        }} />
      ))}

      {/* TROPISCHE INSEL */}
      {phase >= 1 && (
        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'islandFloat 4s ease-in-out infinite',
          textAlign: 'center'
        }}>
          {/* WASSER */}
          <div style={{
            width: '280px', height: '30px',
            background: 'rgba(30,100,200,0.4)',
            borderRadius: '50%',
            margin: '0 auto',
            filter: 'blur(4px)'
          }} />
          {/* INSEL */}
          <div style={{
            width: '200px', height: '50px',
            background: 'linear-gradient(180deg, #c8a84b 0%, #8B6914 100%)',
            borderRadius: '50% 50% 40% 40%',
            margin: '-15px auto 0',
            position: 'relative'
          }}>
            {/* GRAS */}
            <div style={{
              position: 'absolute', top: '-8px', left: '10%',
              width: '80%', height: '18px',
              background: 'linear-gradient(180deg, #2d8a2d 0%, #1a5c1a 100%)',
              borderRadius: '50%'
            }} />
            {/* PALMEN */}
            <div style={{ position: 'absolute', top: '-50px', left: '20px', fontSize: '32px' }}>🌴</div>
            <div style={{ position: 'absolute', top: '-45px', right: '20px', fontSize: '28px' }}>🌴</div>
            <div style={{ position: 'absolute', top: '-35px', left: '50%', transform: 'translateX(-50%)', fontSize: '20px' }}>🏖️</div>
          </div>
          {/* ANMELDEN / REGISTRIEREN BUTTONS auf der Insel */}
          <div style={{
            display: 'flex', gap: '12px', justifyContent: 'center',
            marginTop: '8px',
            opacity: phase >= 4 ? 1 : 0,
            transition: 'opacity 0.5s'
          }}>
            <div style={{
              background: '#e94560', borderRadius: '20px',
              padding: '6px 14px', fontSize: '11px',
              color: '#fff', fontWeight: '700',
              boxShadow: '0 0 10px rgba(233,69,96,0.6)',
              animation: phase >= 4 ? 'buttonPulse 2s infinite' : 'none'
            }}>ANMELDEN</div>
            <div style={{
              background: '#533483', borderRadius: '20px',
              padding: '6px 14px', fontSize: '11px',
              color: '#fff', fontWeight: '700',
              boxShadow: '0 0 10px rgba(83,52,131,0.6)'
            }}>REGISTRIEREN</div>
          </div>
        </div>
      )}

      {/* FLIEGENDER TEPPICH */}
      {phase >= 2 && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: phase === 2
            ? 'carpetIn 1s ease-out forwards'
            : 'float 3s ease-in-out infinite',
          zIndex: 10
        }}>
          {/* TEPPICH */}
          <div style={{
            width: '220px', height: '70px',
            background: 'linear-gradient(135deg, #8B1A8B 0%, #533483 30%, #8B1A8B 60%, #533483 100%)',
            borderRadius: '12px',
            border: '3px solid #ffd700',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(83,52,131,0.6), 0 0 40px rgba(255,215,0,0.2)'
          }}>
            {/* TEPPICH MUSTER */}
            <div style={{
              position: 'absolute', inset: '6px',
              border: '2px solid rgba(255,215,0,0.4)',
              borderRadius: '8px'
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '20px', letterSpacing: '4px'
            }}>✦ ✦ ✦</div>
            {/* TEPPICH FRANSEN */}
            <div style={{
              position: 'absolute', bottom: '-8px', left: '10px', right: '10px',
              display: 'flex', justifyContent: 'space-around'
            }}>
              {Array.from({length: 8}).map((_, i) => (
                <div key={i} style={{
                  width: '4px', height: '8px',
                  background: '#ffd700', borderRadius: '0 0 2px 2px'
                }} />
              ))}
            </div>
            {/* MAGISCHER GLANZ */}
            <div style={{
              position: 'absolute', top: '-4px', left: '20px',
              fontSize: '16px', animation: 'sparkle 1s infinite'
            }}>✨</div>
            <div style={{
              position: 'absolute', top: '-4px', right: '20px',
              fontSize: '16px', animation: 'sparkle 1s infinite 0.5s'
            }}>✨</div>

            {/* AVATARE AUF DEM TEPPICH */}
            <div style={{
              position: 'absolute', top: '-45px', left: 0, right: 0,
              display: 'flex', justifyContent: 'space-around',
              padding: '0 10px'
            }}>
              {phase < 3 && avatars.slice(0, 3).map((a, i) => (
                <div key={i} style={{
                  fontSize: '28px',
                  animation: 'fadeIn 0.5s ease forwards',
                  animationDelay: `${i * 0.2}s`
                }}>
                  {a.emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SPRINGENDE AVATARE MIT FALLSCHIRMEN */}
      {phase >= 3 && avatars.map((a, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: a.left,
          top: '20%',
          animation: 'parachute 3s ease-in forwards',
          animationDelay: a.delay,
          zIndex: 20,
          textAlign: 'center'
        }}>
          {/* FALLSCHIRM */}
          <div style={{ fontSize: '28px', marginBottom: '-4px' }}>🪂</div>
          {/* AVATAR */}
          <div style={{ fontSize: '24px' }}>{a.emoji}</div>
        </div>
      ))}

      {/* ZOCKERIA TITEL */}
      {phase >= 4 && (
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          animation: 'titleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          zIndex: 30
        }}>
          <div style={{
            fontSize: '48px', fontWeight: '900',
            color: '#e94560', letterSpacing: '4px',
            textShadow: '0 0 40px rgba(233,69,96,0.8), 0 0 80px rgba(233,69,96,0.4)'
          }}>
            ZOCKERIA
          </div>
          <div style={{ fontSize: '12px', color: '#ffd700', letterSpacing: '3px', marginTop: '4px' }}>
            WO GAMING ZUR LEBENSWEISE WIRD
          </div>
          {/* FUNKELN */}
          {['10%','30%','50%','70%','90%'].map((left, i) => (
            <div key={i} style={{
              position: 'absolute', top: '-10px', left,
              fontSize: '14px',
              animation: `sparkle 0.6s ease infinite`,
              animationDelay: `${i * 0.15}s`
            }}>⭐</div>
          ))}
        </div>
      )}

      {/* SKIP BUTTON */}
      <button
        onClick={() => setSkip(true)}
        style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px', color: '#fff',
          padding: '6px 16px', fontSize: '12px',
          cursor: 'pointer', zIndex: 100,
          backdropFilter: 'blur(4px)'
        }}
      >
        Überspringen ✕
      </button>

      {/* LADEBALKEN */}
      <div style={{
        position: 'absolute', bottom: '6%', left: '50%',
        transform: 'translateX(-50%)', width: '200px'
      }}>
        <div style={{ fontSize: '11px', color: '#666', textAlign: 'center', marginBottom: '6px' }}>
          Welt wird geladen...
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
          <div style={{
            height: '100%', background: '#e94560', borderRadius: '2px',
            width: phase === 0 ? '10%' : phase === 1 ? '30%' : phase === 2 ? '55%' : phase === 3 ? '80%' : '100%',
            transition: 'width 1s ease'
          }} />
        </div>
      </div>

    </div>
  )
}
