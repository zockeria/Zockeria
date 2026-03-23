'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Intro from './components/Intro'

const Map = dynamic(() => import('./components/Map'), { ssr: false })

export default function Home() {
  const [activeTab, setActiveTab] = useState('map')
  const [loggedIn, setLoggedIn] = useState(false)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (mode === 'register') {
        setShowWelcome(true)
      } else {
        setLoggedIn(true)
      }
    }, 1500)
  }

  const tabs = [
    { id: 'map', icon: '🌍', label: 'Karte' },
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'ranking', icon: '🏆', label: 'Rang' },
    { id: 'profile', icon: '👤', label: 'Profil' },
  ]
  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />
  }

  // ── WILLKOMMENS-SCREEN ──────────────────────────────────────
  if (showWelcome) {
    return (
      <div style={{
        width: '100vw', height: '100dvh', background: '#0a0a1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '20px'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e94560', marginBottom: '8px' }}>
          Willkommen bei Zockeria!
        </div>
        <div style={{ fontSize: '15px', color: '#aaa', marginBottom: '8px', textAlign: 'center' }}>
          Dein Startkapital:
        </div>
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffd700', marginBottom: '24px' }}>
          💰 1.000.000 ZC
        </div>
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '32px', textAlign: 'center', lineHeight: '1.6' }}>
          Baue dein Imperium. Kaufe Territorien.<br/>Gründe Firmen. Werde legendär.
        </div>
        <button
          onClick={() => { setShowWelcome(false); setLoggedIn(true) }}
          style={{
            background: '#e94560', border: 'none', borderRadius: '14px',
            color: '#fff', padding: '14px 40px', fontSize: '16px',
            fontWeight: '700', cursor: 'pointer', letterSpacing: '1px'
          }}
        >
          LOS GEHT'S →
        </button>
      </div>
    )
  }

  // ── LOGIN / REGISTER ────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div style={{
        width: '100vw', height: '100dvh', background: '#0a0a1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px', overflow: 'hidden'
      }}>

        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%)',
          top: '10%', left: '50%', transform: 'translateX(-50%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(83,52,131,0.2) 0%, transparent 70%)',
          bottom: '20%', right: '10%', pointerEvents: 'none'
        }} />

        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: '32px', zIndex: 1 }}>
          <div style={{
            fontSize: '42px', fontWeight: '900', color: '#e94560',
            letterSpacing: '4px', textShadow: '0 0 30px rgba(233,69,96,0.5)'
          }}>
            ZOCKERIA
          </div>
          <div style={{ fontSize: '12px', color: '#533483', marginTop: '4px', letterSpacing: '2px' }}>
            WO GAMING ZUR LEBENSWEISE WIRD
          </div>
        </div>

        {/* CARD */}
        <div style={{
          width: '100%', maxWidth: '380px',
          background: '#16213e', border: '1px solid #e94560',
          borderRadius: '20px', padding: '24px', zIndex: 1
        }}>

          {/* TABS */}
          <div style={{
            display: 'flex', background: '#0a0a1a',
            borderRadius: '12px', padding: '4px', marginBottom: '24px'
          }}>
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1,
                background: mode === m ? '#e94560' : 'transparent',
                border: 'none', borderRadius: '10px',
                color: mode === m ? '#fff' : '#666',
                padding: '10px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {m === 'login' ? 'Anmelden' : 'Registrieren'}
              </button>
            ))}
          </div>

          {/* FELDER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {mode === 'register' && (
              <div>
                <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '6px', letterSpacing: '0.5px' }}>BENUTZERNAME</div>
                <input
                  name="username" value={form.username} onChange={handleChange}
                  placeholder="Dein Zockeria-Name"
                  style={{
                    width: '100%', background: '#0a0a1a', border: '1px solid #533483',
                    borderRadius: '12px', padding: '12px 16px', color: '#fff',
                    fontSize: '15px', outline: 'none'
                  }}
                />
              </div>
            )}

            <div>
              <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '6px', letterSpacing: '0.5px' }}>E-MAIL</div>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="deine@email.de"
                style={{
                  width: '100%', background: '#0a0a1a', border: '1px solid #533483',
                  borderRadius: '12px', padding: '12px 16px', color: '#fff',
                  fontSize: '15px', outline: 'none'
                }}
              />
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '6px', letterSpacing: '0.5px' }}>PASSWORT</div>
              <input
                name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%', background: '#0a0a1a', border: '1px solid #533483',
                  borderRadius: '12px', padding: '12px 16px', color: '#fff',
                  fontSize: '15px', outline: 'none'
                }}
              />
            </div>

            {mode === 'register' && (
              <div style={{
                background: 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '12px', padding: '12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#aaa' }}>Dein Startkapital</div>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffd700', marginTop: '2px' }}>
                  💰 1.000.000 ZC
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', background: loading ? '#533483' : '#e94560',
                border: 'none', borderRadius: '14px', color: '#fff',
                padding: '14px', fontSize: '16px', fontWeight: '700',
                cursor: loading ? 'default' : 'pointer', marginTop: '8px',
                letterSpacing: '1px', transition: 'background 0.2s'
              }}
            >
              {loading ? '⏳ Laden...' : mode === 'login' ? 'ANMELDEN →' : 'JETZT STARTEN →'}
            </button>

          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#333', marginTop: '20px', textAlign: 'center', zIndex: 1 }}>
          Mit der Registrierung stimmst du den Nutzungsbedingungen zu.
        </div>
      </div>
    )
  }

  // ── HAUPT-APP ───────────────────────────────────────────────
  return (
    <div style={{
      width: '100vw', height: '100dvh', background: '#0a0a1a',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>

      <nav style={{
        height: '52px', background: '#16213e',
        borderBottom: '1px solid #e94560',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 16px',
        flexShrink: 0, zIndex: 1000
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e94560', letterSpacing: '2px' }}>
          ZOCKERIA
        </div>
        <div style={{
          background: '#1a1a2e', border: '1px solid #ffd700',
          borderRadius: '20px', padding: '5px 14px',
          fontSize: '13px', color: '#ffd700', fontWeight: '600'
        }}>
          💰 1.000.000 ZC
        </div>
      </nav>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

        {activeTab === 'map' && (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Map />
            <div style={{
              position: 'absolute', top: '12px', left: '12px',
              zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              <div style={{
                background: 'rgba(22,33,62,0.92)', border: '1px solid #e94560',
                borderRadius: '10px', padding: '8px 14px', backdropFilter: 'blur(8px)'
              }}>
                <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Standort</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginTop: '1px' }}>München 🇩🇪</div>
              </div>
              <div style={{
                background: 'rgba(22,33,62,0.92)', border: '1px solid #533483',
                borderRadius: '10px', padding: '8px 14px', backdropFilter: 'blur(8px)'
              }}>
                <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Level 1 · XP</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffd700', marginTop: '1px' }}>0 / 500</div>
                <div style={{ height: '3px', background: '#1a1a2e', borderRadius: '2px', marginTop: '5px' }}>
                  <div style={{ width: '0%', height: '100%', background: '#533483', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px', zIndex: 1000,
              background: 'rgba(22,33,62,0.92)', border: '1px solid #0f6b3c',
              borderRadius: '10px', padding: '8px 14px', backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Online</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#34d399', marginTop: '1px' }}>● 1.247</div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '12px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#e94560', marginBottom: '12px' }}>💬 Globaler Chat</div>
            <div style={{
              flex: 1, background: '#16213e', borderRadius: '12px',
              border: '1px solid #533483', padding: '12px',
              overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'
            }}>
              {[
                { user: 'MaxMüller', city: 'München', msg: 'Wer will ein Grundstück in Paris kaufen? 200k ZC!', color: '#e94560' },
                { user: 'SaoPauloKing', city: 'São Paulo', msg: 'Meine Firma macht heute 50k ZC Umsatz 🔥', color: '#ffd700' },
                { user: 'NightHawk_NYC', city: 'New York', msg: 'Suche Bodyguards für mein Business, zahle gut', color: '#34d399' },
                { user: 'ParisBoss', city: 'Paris', msg: 'Gang sucht neue Mitglieder – DM me', color: '#533483' },
                { user: 'TokyoDrift', city: 'Tokyo', msg: 'Wer streamt heute Abend? Schaue gerne zu', color: '#60a5fa' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: m.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', fontWeight: 'bold',
                    flexShrink: 0, color: '#fff'
                  }}>{m.user[0]}</div>
                  <div>
                    <div style={{ fontSize: '11px' }}>
                      <span style={{ color: m.color, fontWeight: '600' }}>{m.user}</span>
                      <span style={{ color: '#555', marginLeft: '6px' }}>📍{m.city}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#ddd', marginTop: '2px', lineHeight: '1.4' }}>{m.msg}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <input placeholder="Nachricht schreiben..." style={{
                flex: 1, background: '#16213e', border: '1px solid #533483',
                borderRadius: '24px', padding: '10px 16px', color: '#fff',
                fontSize: '14px', outline: 'none'
              }} />
              <button style={{
                background: '#e94560', border: 'none', borderRadius: '24px',
                padding: '10px 18px', color: '#fff', fontSize: '14px',
                cursor: 'pointer', fontWeight: '600', flexShrink: 0
              }}>→</button>
            </div>
          </div>
        )}

        {activeTab === 'ranking' && (
          <div style={{ padding: '12px', overflowY: 'auto', height: '100%' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#e94560', marginBottom: '12px' }}>🏆 Weltrangliste</div>
            {[
              { user: 'DiamondKing_Dubai', city: 'Dubai', coins: '48.2M', badge: '👑' },
              { user: 'NycMogul', city: 'New York', coins: '31.5M', badge: '💎' },
              { user: 'ParisBoss', city: 'Paris', coins: '22.8M', badge: '🥇' },
              { user: 'TokyoDrift', city: 'Tokyo', coins: '18.3M', badge: '🥈' },
              { user: 'SaoPauloKing', city: 'São Paulo', coins: '15.7M', badge: '🥉' },
              { user: 'MaxMüller', city: 'München', coins: '9.2M', badge: '⭐' },
              { user: 'LondonLord', city: 'London', coins: '7.8M', badge: '⭐' },
              { user: 'BerlinBoss', city: 'Berlin', coins: '5.4M', badge: '⭐' },
            ].map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: i === 0 ? 'rgba(255,215,0,0.08)' : '#16213e',
                border: `1px solid ${i === 0 ? '#ffd700' : '#1a1a2e'}`,
                borderRadius: '10px', padding: '10px 14px', marginBottom: '8px'
              }}>
                <div style={{ fontSize: '18px', width: '28px', textAlign: 'center' }}>{p.badge}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>{p.user}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>📍 {p.city}</div>
                </div>
                <div style={{ fontSize: '13px', color: '#ffd700', fontWeight: '600' }}>{p.coins} ZC</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ padding: '12px', overflowY: 'auto', height: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #e94560, #533483)',
                margin: '0 auto 10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '28px', border: '3px solid #e94560'
              }}>👤</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
                {form.username || 'Dein Name'}
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '3px' }}>📍 München · Level 1</div>
            </div>
            {[
              { label: 'Coins', value: '1.000.000 ZC', color: '#ffd700' },
              { label: 'XP', value: '0 / 500', color: '#533483' },
              { label: 'Rang', value: '#∞ Weltrangliste', color: '#e94560' },
              { label: 'Mitglied seit', value: 'Heute', color: '#34d399' },
              { label: 'Territorien', value: '0', color: '#60a5fa' },
              { label: 'Firmen', value: '0', color: '#f59e0b' },
              { label: 'Karma', value: '100 ⚡', color: '#a78bfa' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: '#16213e', border: '1px solid #1a1a2e',
                borderRadius: '10px', padding: '11px 14px', marginBottom: '8px'
              }}>
                <div style={{ fontSize: '13px', color: '#aaa' }}>{s.label}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: s.color }}>{s.value}</div>
              </div>
            ))}
            <button
              onClick={() => setLoggedIn(false)}
              style={{
                width: '100%', background: 'transparent',
                border: '1px solid #e94560', borderRadius: '12px',
                color: '#e94560', padding: '12px', fontSize: '14px',
                cursor: 'pointer', marginTop: '8px', fontWeight: '600'
              }}
            >
              Abmelden
            </button>
          </div>
        )}
      </div>

      <nav style={{
        height: '64px', background: '#16213e',
        borderTop: '1px solid #e94560',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-around', flexShrink: 0,
        zIndex: 1000, paddingBottom: 'env(safe-area-inset-bottom)'
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: activeTab === tab.id ? 'rgba(233,69,96,0.15)' : 'transparent',
            border: 'none', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '3px', cursor: 'pointer',
            padding: '8px 20px', borderRadius: '12px'
          }}>
            <span style={{ fontSize: '22px' }}>{tab.icon}</span>
            <span style={{
              fontSize: '10px', fontWeight: '600',
              color: activeTab === tab.id ? '#e94560' : '#555',
              letterSpacing: '0.5px'
            }}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
