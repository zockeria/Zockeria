'use client'

import { useState } from 'react'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1500)
  }

  if (done) {
    return (
      <div style={{
        width: '100vw', height: '100dvh',
        background: '#0a0a1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e94560', marginBottom: '8px' }}>
          Willkommen bei Zockeria!
        </div>
        <div style={{ fontSize: '15px', color: '#aaa', marginBottom: '8px', textAlign: 'center' }}>
          Du erhältst
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffd700', marginBottom: '24px' }}>
          💰 1.000.000 ZC
        </div>
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '32px', textAlign: 'center' }}>
          Dein Startkapital wartet auf dich. Baue dein Imperium!
        </div>
        <a href="/" style={{
          background: '#e94560', border: 'none', borderRadius: '14px',
          color: '#fff', padding: '14px 40px', fontSize: '16px',
          fontWeight: '700', cursor: 'pointer', textDecoration: 'none',
          letterSpacing: '1px'
        }}>
          LOS GEHT'S →
        </a>
      </div>
    )
  }

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      background: '#0a0a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflow: 'hidden'
    }}>

      {/* HINTERGRUND EFFEKT */}
      <div style={{
        position: 'absolute',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%)',
        top: '10%', left: '50%', transform: 'translateX(-50%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(83,52,131,0.2) 0%, transparent 70%)',
        bottom: '20%', right: '10%',
        pointerEvents: 'none'
      }} />

      {/* LOGO */}
      <div style={{ textAlign: 'center', marginBottom: '32px', zIndex: 1 }}>
        <div style={{
          fontSize: '42px', fontWeight: '900',
          color: '#e94560', letterSpacing: '4px',
          textShadow: '0 0 30px rgba(233,69,96,0.5)'
        }}>
          ZOCKERIA
        </div>
        <div style={{ fontSize: '13px', color: '#533483', marginTop: '4px', letterSpacing: '2px' }}>
          WO GAMING ZUR LEBENSWEISE WIRD
        </div>
      </div>

      {/* CARD */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: '#16213e',
        border: '1px solid #e94560',
        borderRadius: '20px',
        padding: '24px',
        zIndex: 1
      }}>

        {/* TABS */}
        <div style={{
          display: 'flex',
          background: '#0a0a1a',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px'
        }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                background: mode === m ? '#e94560' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: mode === m ? '#fff' : '#666',
                padding: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {m === 'login' ? 'Anmelden' : 'Registrieren'}
            </button>
          ))}
        </div>

        {/* FELDER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {mode === 'register' && (
            <div>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', letterSpacing: '0.5px' }}>
                BENUTZERNAME
              </div>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Dein Zockeria-Name"
                style={{
                  width: '100%', background: '#0a0a1a',
                  border: '1px solid #533483', borderRadius: '12px',
                  padding: '12px 16px', color: '#fff', fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <div>
            <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', letterSpacing: '0.5px' }}>
              E-MAIL
            </div>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="deine@email.de"
              style={{
                width: '100%', background: '#0a0a1a',
                border: '1px solid #533483', borderRadius: '12px',
                padding: '12px 16px', color: '#fff', fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', letterSpacing: '0.5px' }}>
              PASSWORT
            </div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%', background: '#0a0a1a',
                border: '1px solid #533483', borderRadius: '12px',
                padding: '12px 16px', color: '#fff', fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {mode === 'register' && (
            <div style={{
              background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: '#aaa' }}>Du erhältst als Startkapital</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffd700', marginTop: '2px' }}>
                💰 1.000.000 ZC
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#533483' : '#e94560',
              border: 'none',
              borderRadius: '14px',
              color: '#fff',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'default' : 'pointer',
              marginTop: '8px',
              letterSpacing: '1px',
              transition: 'background 0.2s'
            }}
          >
            {loading ? '⏳ Laden...' : mode === 'login' ? 'ANMELDEN →' : 'JETZT STARTEN →'}
          </button>

        </div>
      </div>

      {/* FOOTER */}
      <div style={{ fontSize: '11px', color: '#333', marginTop: '20px', textAlign: 'center', zIndex: 1 }}>
        Mit der Registrierung stimmst du den Nutzungsbedingungen zu.
      </div>

    </div>
  )
}
