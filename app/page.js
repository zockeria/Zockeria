'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./components/Map'), { ssr: false })

export default function Home() {
  const [activeTab, setActiveTab] = useState('map')

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a1a', display: 'flex', flexDirection: 'column' }}>
      
      {/* TOP NAV */}
      <nav style={{
        height: '56px',
        background: '#16213e',
        borderBottom: '1px solid #e94560',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1000,
        flexShrink: 0
      }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#e94560', letterSpacing: '2px' }}>
          ZOCKERIA
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['map','chat','ranking','profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#e94560' : 'transparent',
                border: '1px solid #e94560',
                color: activeTab === tab ? '#fff' : '#e94560',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}
            >
              {tab === 'map' ? '🌍 Karte' : tab === 'chat' ? '💬 Chat' : tab === 'ranking' ? '🏆 Rang' : '👤 Profil'}
            </button>
          ))}
        </div>
        <div style={{
          background: '#1a1a2e',
          border: '1px solid #533483',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '14px',
          color: '#ffd700'
        }}>
          💰 1.000.000 ZC
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {activeTab === 'map' && (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Map />
            
            {/* HUD */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                background: 'rgba(22,33,62,0.92)',
                border: '1px solid #e94560',
                borderRadius: '10px',
                padding: '10px 16px',
                backdropFilter: 'blur(8px)'
              }}>
                <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Standort</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginTop: '2px' }}>München 🇩🇪</div>
              </div>
              <div style={{
                background: 'rgba(22,33,62,0.92)',
                border: '1px solid #533483',
                borderRadius: '10px',
                padding: '10px 16px',
                backdropFilter: 'blur(8px)'
              }}>
                <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Level 1 · XP</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#ffd700', marginTop: '2px' }}>0 / 500</div>
                <div style={{ height: '4px', background: '#1a1a2e', borderRadius: '2px', marginTop: '6px' }}>
                  <div style={{ width: '0%', height: '100%', background: '#533483', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>

            {/* ONLINE COUNTER */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 1000,
              background: 'rgba(22,33,62,0.92)',
              border: '1px solid #0f6b3c',
              borderRadius: '10px',
              padding: '10px 16px',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Online</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#34d399', marginTop: '2px' }}>● 1.247</div>
            </div>

          </div>
        )}

        {activeTab === 'chat' && (
          <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#e94560', marginBottom: '16px' }}>💬 Globaler Chat</div>
            <div style={{
              flex: 1,
              background: '#16213e',
              borderRadius: '12px',
              border: '1px solid #533483',
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
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
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: m.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', fontWeight: 'bold',
                    flexShrink: 0, color: '#fff'
                  }}>
                    {m.user[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px' }}>
                      <span style={{ color: m.color, fontWeight: '600' }}>{m.user}</span>
                      <span style={{ color: '#666', marginLeft: '6px' }}>📍{m.city}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#ddd', marginTop: '2px' }}>{m.msg}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <input
                placeholder="Nachricht schreiben..."
                style={{
                  flex: 1, background: '#16213e', border: '1px solid #533483',
                  borderRadius: '24px', padding: '12px 18px', color: '#fff',
                  fontSize: '14px', outline: 'none'
                }}
              />
              <button style={{
                background: '#e94560', border: 'none', borderRadius: '24px',
                padding: '12px 20px', color: '#fff', fontSize: '14px',
                cursor: 'pointer', fontWeight: '600'
              }}>Senden</button>
            </div>
          </div>
        )}

        {activeTab === 'ranking' && (
          <div style={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#e94560', marginBottom: '16px' }}>🏆 Weltrangliste</div>
            {[
              { rank: 1, user: 'DiamondKing_Dubai', city: 'Dubai', coins: '48.200.000', badge: '👑' },
              { rank: 2, user: 'NycMogul', city: 'New York', coins: '31.500.000', badge: '💎' },
              { rank: 3, user: 'ParisBoss', city: 'Paris', coins: '22.800.000', badge: '🥇' },
              { rank: 4, user: 'TokyoDrift', city: 'Tokyo', coins: '18.300.000', badge: '🥈' },
              { rank: 5, user: 'SaoPauloKing', city: 'São Paulo', coins: '15.700.000', badge: '🥉' },
              { rank: 6, user: 'MaxMüller', city: 'München', coins: '9.200.000', badge: '⭐' },
              { rank: 7, user: 'LondonLord', city: 'London', coins: '7.800.000', badge: '⭐' },
              { rank: 8, user: 'BerlinBoss', city: 'Berlin', coins: '5.400.000', badge: '⭐' },
            ].map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: i === 0 ? 'rgba(255,215,0,0.1)' : '#16213e',
                border: `1px solid ${i === 0 ? '#ffd700' : '#533483'}`,
                borderRadius: '10px', padding: '12px 16px', marginBottom: '8px'
              }}>
                <div style={{ fontSize: '20px', width: '30px', textAlign: 'center' }}>{p.badge}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{p.user}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>📍 {p.city}</div>
                </div>
                <div style={{ fontSize: '13px', color: '#ffd700', fontWeight: '600' }}>{p.coins} ZC</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #e94560, #533483)',
                margin: '0 auto 12px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '32px', border: '3px solid #e94560'
              }}>👤</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Dein Name</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>📍 München · Level 1</div>
            </div>
            {[
              { label: 'Coins', value: '1.000.000 ZC', color: '#ffd700' },
              { label: 'XP', value: '0 / 500', color: '#533483' },
              { label: 'Rang', value: '#∞ Weltrangliste', color: '#e94560' },
              { label: 'Mitglied seit', value: 'Heute', color: '#34d399' },
              { label: 'Territorien', value: '0', color: '#60a5fa' },
              { label: 'Firmen', value: '0', color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: '#16213e', border: '1px solid #1a1a2e',
                borderRadius: '10px', padding: '12px 16px', marginBottom: '8px'
              }}>
                <div style={{ fontSize: '14px', color: '#aaa' }}>{s.label}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
