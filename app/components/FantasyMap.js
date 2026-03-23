'use client'

import { useEffect, useRef, useState } from 'react'

const cities = [
  { name: 'München', flag: '🇩🇪', lat: 48.137, lng: 11.576, coins: '2.4M', users: 342 },
  { name: 'Berlin', flag: '🇩🇪', lat: 52.520, lng: 13.405, coins: '8.1M', users: 891 },
  { name: 'Paris', flag: '🇫🇷', lat: 48.853, lng: 2.350, coins: '15.3M', users: 1204 },
  { name: 'London', flag: '🇬🇧', lat: 51.507, lng: -0.128, coins: '22.7M', users: 1567 },
  { name: 'Madrid', flag: '🇪🇸', lat: 40.416, lng: -3.703, coins: '9.1M', users: 654 },
  { name: 'Rom', flag: '🇮🇹', lat: 41.902, lng: 12.496, coins: '7.8M', users: 543 },
  { name: 'Amsterdam', flag: '🇳🇱', lat: 52.374, lng: 4.899, coins: '6.2M', users: 421 },
  { name: 'Wien', flag: '🇦🇹', lat: 48.208, lng: 16.373, coins: '5.1M', users: 312 },
  { name: 'Moskau', flag: '🇷🇺', lat: 55.751, lng: 37.618, coins: '11.2M', users: 778 },
  { name: 'Istanbul', flag: '🇹🇷', lat: 41.015, lng: 28.980, coins: '8.4M', users: 634 },
  { name: 'Dubai', flag: '🇦🇪', lat: 25.204, lng: 55.270, coins: '19.8M', users: 654 },
  { name: 'Mumbai', flag: '🇮🇳', lat: 19.076, lng: 72.877, coins: '9.6M', users: 1123 },
  { name: 'Tokyo', flag: '🇯🇵', lat: 35.682, lng: 139.691, coins: '31.5M', users: 1893 },
  { name: 'Shanghai', flag: '🇨🇳', lat: 31.224, lng: 121.469, coins: '18.2M', users: 1456 },
  { name: 'Peking', flag: '🇨🇳', lat: 39.904, lng: 116.407, coins: '14.7M', users: 1234 },
  { name: 'Seoul', flag: '🇰🇷', lat: 37.566, lng: 126.978, coins: '12.3M', users: 987 },
  { name: 'Singapur', flag: '🇸🇬', lat: 1.352, lng: 103.820, coins: '16.4M', users: 876 },
  { name: 'Sydney', flag: '🇦🇺', lat: -33.868, lng: 151.209, coins: '7.2M', users: 445 },
  { name: 'New York', flag: '🇺🇸', lat: 40.712, lng: -74.006, coins: '48.2M', users: 2341 },
  { name: 'Los Angeles', flag: '🇺🇸', lat: 34.052, lng: -118.244, coins: '28.1M', users: 1876 },
  { name: 'Chicago', flag: '🇺🇸', lat: 41.878, lng: -87.629, coins: '15.6M', users: 1123 },
  { name: 'Toronto', flag: '🇨🇦', lat: 43.651, lng: -79.347, coins: '11.3M', users: 876 },
  { name: 'São Paulo', flag: '🇧🇷', lat: -23.550, lng: -46.633, coins: '12.4M', users: 987 },
  { name: 'Buenos Aires', flag: '🇦🇷', lat: -34.603, lng: -58.381, coins: '8.7M', users: 654 },
  { name: 'Lagos', flag: '🇳🇬', lat: 6.524, lng: 3.379, coins: '3.1M', users: 334 },
  { name: 'Kairo', flag: '🇪🇬', lat: 30.044, lng: 31.235, coins: '5.4M', users: 456 },
  { name: 'Johannesburg', flag: '🇿🇦', lat: -26.204, lng: 28.047, coins: '4.2M', users: 312 },
  { name: 'Mexico City', flag: '🇲🇽', lat: 19.432, lng: -99.133, coins: '9.8M', users: 765 },
]

function lngLatToXY(lng, lat, width, height) {
  const x = (lng + 180) / 360 * width
  const y = (90 - lat) / 180 * height
  return { x, y }
}

export default function FantasyMap() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const isDragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const lastTouchDist = useRef(null)

  const MAP_W = 1200
  const MAP_H = 600

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = MAP_W
    canvas.height = MAP_H
    drawMap(ctx)
  }, [])

  function drawMap(ctx) {
    // OZEAN - dunkelblau mit Textur
    const oceanGrad = ctx.createLinearGradient(0, 0, MAP_W, MAP_H)
    oceanGrad.addColorStop(0, '#0d2a4a')
    oceanGrad.addColorStop(0.5, '#0a1f3a')
    oceanGrad.addColorStop(1, '#071528')
    ctx.fillStyle = oceanGrad
    ctx.fillRect(0, 0, MAP_W, MAP_H)

    // OZEAN WELLEN TEXTUR
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 0.5
    for (let y = 20; y < MAP_H; y += 20) {
      ctx.beginPath()
      for (let x = 0; x < MAP_W; x += 40) {
        ctx.moveTo(x, y)
        ctx.quadraticCurveTo(x + 10, y - 4, x + 20, y)
        ctx.quadraticCurveTo(x + 30, y + 4, x + 40, y)
      }
      ctx.stroke()
    }

    // PERGAMENT RAND
    const borderGrad = ctx.createLinearGradient(0, 0, MAP_W, 0)
    borderGrad.addColorStop(0, 'rgba(139,90,43,0.3)')
    borderGrad.addColorStop(0.5, 'rgba(139,90,43,0)')
    borderGrad.addColorStop(1, 'rgba(139,90,43,0.3)')
    ctx.fillStyle = borderGrad
    ctx.fillRect(0, 0, MAP_W, MAP_H)

    // LÄNDER zeichnen (vereinfachte Polygone der echten Länder)
    const countries = getCountryShapes()
    countries.forEach(country => {
      ctx.beginPath()
      country.paths.forEach((path, pi) => {
        path.forEach((point, i) => {
          const { x, y } = lngLatToXY(point[0], point[1], MAP_W, MAP_H)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.closePath()
      })

      // LAND FARBE - grün/braun Töne
      const landGrad = ctx.createLinearGradient(0, 0, 0, MAP_H)
      landGrad.addColorStop(0, country.color || '#2d5a1b')
      landGrad.addColorStop(1, country.colorDark || '#1a3510')
      ctx.fillStyle = landGrad
      ctx.fill()

      // LAND RAND (Pergament-Stil)
      ctx.strokeStyle = 'rgba(180,140,60,0.6)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      // SCHRAFFUR TEXTUR auf Ländern
      ctx.save()
      ctx.clip()
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'
      ctx.lineWidth = 0.3
      for (let i = -MAP_H; i < MAP_W + MAP_H; i += 6) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i - MAP_H, MAP_H)
        ctx.stroke()
      }
      ctx.restore()
    })

    // KOORDINATEN GITTER (wie alte Seekarten)
    ctx.strokeStyle = 'rgba(180,140,60,0.12)'
    ctx.lineWidth = 0.5
    ctx.setLineDash([4, 4])
    for (let lng = -180; lng <= 180; lng += 30) {
      const { x } = lngLatToXY(lng, 0, MAP_W, MAP_H)
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, MAP_H)
      ctx.stroke()
    }
    for (let lat = -90; lat <= 90; lat += 30) {
      const { y } = lngLatToXY(0, lat, MAP_W, MAP_H)
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(MAP_W, y)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // ÄQUATOR (gold)
    ctx.strokeStyle = 'rgba(255,215,0,0.25)'
    ctx.lineWidth = 1
    const { y: eqY } = lngLatToXY(0, 0, MAP_W, MAP_H)
    ctx.beginPath()
    ctx.moveTo(0, eqY)
    ctx.lineTo(MAP_W, eqY)
    ctx.stroke()

    // WINDROSE (Kompass)
    drawCompass(ctx, 80, 520, 45)

    // TITEL
    ctx.font = 'bold 18px serif'
    ctx.fillStyle = 'rgba(255,215,0,0.7)'
    ctx.textAlign = 'center'
    ctx.fillText('⚓ ZOCKERIA WELTKARTE ⚓', MAP_W / 2, 22)

    ctx.font = '10px serif'
    ctx.fillStyle = 'rgba(180,140,60,0.5)'
    ctx.fillText('Terra Incognita — Anno MMXXV', MAP_W / 2, 38)
  }

  function drawCompass(ctx, cx, cy, size) {
    // KOMPASS KREIS
    ctx.beginPath()
    ctx.arc(cx, cy, size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(20,40,60,0.7)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,215,0,0.5)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // KOMPASS NADELN
    const directions = [
      { angle: -90, label: 'N', color: '#e94560', length: size * 0.75 },
      { angle: 90, label: 'S', color: '#ffd700', length: size * 0.6 },
      { angle: 0, label: 'O', color: '#ffd700', length: size * 0.6 },
      { angle: 180, label: 'W', color: '#ffd700', length: size * 0.6 },
    ]
    directions.forEach(d => {
      const rad = d.angle * Math.PI / 180
      const ex = cx + Math.cos(rad) * d.length
      const ey = cy + Math.sin(rad) * d.length
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(ex, ey)
      ctx.strokeStyle = d.color
      ctx.lineWidth = d.label === 'N' ? 2 : 1.5
      ctx.stroke()

      // BUCHSTABE
      const lx = cx + Math.cos(rad) * (d.length + 10)
      const ly = cy + Math.sin(rad) * (d.length + 10)
      ctx.font = `bold ${d.label === 'N' ? 12 : 10}px serif`
      ctx.fillStyle = d.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(d.label, lx, ly)
    })

    // MITTELPUNKT
    ctx.beginPath()
    ctx.arc(cx, cy, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#ffd700'
    ctx.fill()
  }

  function getCountryShapes() {
    return [
      // EUROPA
      {
        color: '#3a6b20', colorDark: '#2a4f15',
        paths: [[[−10,36],[30,36],[32,42],[28,48],[20,54],[10,58],[0,58],[−5,54],[−8,48],[−10,44]]]
      },
      // DEUTSCHLAND
      {
        color: '#4a7a28', colorDark: '#355a1c',
        paths: [[[6,47],[15,47],[15,48],[14,51],[13,54],[8,54],[6,51]]]
      },
      // FRANKREICH
      {
        color: '#3d6e22', colorDark: '#2c5018',
        paths: [[[−5,43],[8,43],[8,48],[2,51],[−2,48],[−5,47]]]
      },
      // UK
      {
        color: '#426124', colorDark: '#30461a',
        paths: [[[−6,50],[2,50],[2,58],[−4,58],[−6,54]]]
      },
      // SKANDINAVIEN
      {
        color: '#365f1e', colorDark: '#274516',
        paths: [[[4,55],[18,55],[28,62],[26,70],[18,72],[10,62],[4,58]]]
      },
      // RUSSLAND
      {
        color: '#2e5219', colorDark: '#1f3a11',
        paths: [[[28,50],[60,50],[80,52],[100,55],[140,55],[170,62],[170,72],[100,72],[60,68],[28,65]]]
      },
      // NORDAFRIKA
      {
        color: '#8b6914', colorDark: '#6b500f',
        paths: [[[−18,16],[40,16],[40,37],[30,38],[20,37],[10,37],[0,36],[−10,36],[−18,28]]]
      },
      // SUBSAHARA AFRIKA
      {
        color: '#5a7a20', colorDark: '#3d5516',
        paths: [[[−18,16],[40,16],[42,5],[40,−10],[36,−20],[30,−30],[20,−35],[10,−35],[0,−35],[−10,−30],[−18,−20],[−18,0]]]
      },
      // NAHER OSTEN
      {
        color: '#7a6018', colorDark: '#5a4512',
        paths: [[[25,12],[65,12],[65,38],[55,42],[42,38],[35,32],[25,32]]]
      },
      // ZENTRALASIEN
      {
        color: '#6b7a1a', colorDark: '#4d5812',
        paths: [[[50,38],[90,38],[90,55],[70,55],[50,50]]]
      },
      // SÜDASIEN
      {
        color: '#4a7218', colorDark: '#355212',
        paths: [[[62,8],[92,8],[92,38],[78,38],[68,26],[62,20]]]
      },
      // SÜDOSTASIEN
      {
        color: '#3d6e1a', colorDark: '#2a5012',
        paths: [[[95,5],[140,5],[140,28],[120,28],[100,20],[95,15]]]
      },
      // CHINA/OSTASIEN
      {
        color: '#3a6618', colorDark: '#284a10',
        paths: [[[75,20],[135,20],[140,40],[130,52],[110,52],[90,48],[75,40]]]
      },
      // JAPAN
      {
        color: '#456e20', colorDark: '#305016',
        paths: [[[130,31],[146,31],[146,45],[136,45],[130,40]]]
      },
      // AUSTRALIEN
      {
        color: '#7a6a18', colorDark: '#5a4e12',
        paths: [[[114,−36],[154,−36],[154,−18],[136,−14],[124,−18],[114,−28]]]
      },
      // NORDAMERIKA
      {
        color: '#3d6e22', colorDark: '#2c5018',
        paths: [[[−170,60],[−50,60],[−50,72],[−80,72],[−120,70],[−140,65],[−165,68],[−170,65]]]
      },
      // USA
      {
        color: '#4a7a28', colorDark: '#355a1c',
        paths: [[[−125,25],[−65,25],[−65,50],[−80,50],[−100,50],[−125,48]]]
      },
      // MEXIKO / MITTELAMERIKA
      {
        color: '#5a7a20', colorDark: '#3d5516',
        paths: [[[−120,14],[−75,14],[−75,28],[−90,30],[−105,28],[−118,22]]]
      },
      // SÜDAMERIKA
      {
        color: '#3a7020', colorDark: '#285016',
        paths: [[[−82,12],[−34,12],[−32,−5],[−35,−20],[−40,−35],[−55,−55],[−68,−55],[−76,−40],[−80,−20],[−80,0],[−82,8]]]
      },
      // GRÖNLAND
      {
        color: '#c8d8e8', colorDark: '#a0b8c8',
        paths: [[[−60,60],[−18,60],[−18,84],[−45,84],[−60,76]]]
      },
      // ANTARKTIS
      {
        color: '#d0e0f0', colorDark: '#b0c8e0',
        paths: [[[−180,−75],[180,−75],[180,−90],[−180,−90]]]
      },
    ].map(c => ({
      ...c,
      paths: c.paths.map(path => path.map(([lng, lat]) => [lng, lat]))
    }))
  }

  // TOUCH & MOUSE EVENTS
  function getEventPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onMouseDown(e) {
    isDragging.current = true
    const pos = getEventPos(e, e.currentTarget)
    lastPos.current = pos
  }

  function onMouseMove(e) {
    if (!isDragging.current) return
    const pos = getEventPos(e, e.currentTarget)
    const dx = pos.x - lastPos.current.x
    const dy = pos.y - lastPos.current.y
    lastPos.current = pos
    setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }))
  }

  function onMouseUp() { isDragging.current = false }

  function onWheel(e) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.85 : 1.18
    setTransform(t => ({
      ...t,
      scale: Math.min(Math.max(t.scale * delta, 0.5), 6)
    }))
  }

  function onTouchStart(e) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouchDist.current = Math.sqrt(dx * dx + dy * dy)
    } else {
      isDragging.current = true
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  function onTouchMove(e) {
    e.preventDefault()
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (lastTouchDist.current) {
        const delta = dist / lastTouchDist.current
        setTransform(t => ({ ...t, scale: Math.min(Math.max(t.scale * delta, 0.5), 6) }))
      }
      lastTouchDist.current = dist
    } else if (isDragging.current) {
      const dx = e.touches[0].clientX - lastPos.current.x
      const dy = e.touches[0].clientY - lastPos.current.y
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }))
    }
  }

  function onTouchEnd() {
    isDragging.current = false
    lastTouchDist.current = null
  }

  function onCanvasClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = (e.clientX - rect.left - transform.x) / transform.scale
    const clickY = (e.clientY - rect.top - transform.y) / transform.scale
    const scaleX = MAP_W / rect.width * transform.scale
    const scaleY = MAP_H / rect.height * transform.scale

    let nearest = null
    let minDist = Infinity
    cities.forEach(city => {
      const { x, y } = lngLatToXY(city.lng, city.lat, MAP_W, MAP_H)
      const screenX = (x / MAP_W) * (rect.width / transform.scale) * MAP_W / MAP_W
      const dist = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2)
      if (dist < minDist) { minDist = dist; nearest = { city, cx: x, cy: y } }
    })

    if (nearest && minDist < 30) {
      setTooltip({ city: nearest.city, x: e.clientX, y: e.clientY })
    } else {
      setTooltip(null)
    }
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#071528' }}>

      {/* KARTE CONTAINER */}
      <div
        style={{
          position: 'absolute',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          width: '100%',
          height: '100%'
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onCanvasClick}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* STADT PINS */}
        {cities.map((city, i) => {
          const { x, y } = lngLatToXY(city.lng, city.lat, MAP_W, MAP_H)
          const pct_x = x / MAP_W * 100
          const pct_y = y / MAP_H * 100
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${pct_x}%`,
                top: `${pct_y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer'
              }}
            >
              {/* PIN */}
              <div style={{
                width: '20px', height: '20px',
                background: 'rgba(10,20,40,0.9)',
                border: '2px solid #ffd700',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px',
                boxShadow: '0 0 8px rgba(255,215,0,0.6)',
              }}>
                {city.flag}
              </div>
              {/* STADTNAME bei großem Zoom */}
              {transform.scale > 2 && (
                <div style={{
                  position: 'absolute',
                  top: '22px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontSize: `${8 / transform.scale * 2}px`,
                  color: '#ffd700',
                  textShadow: '0 1px 3px #000',
                  fontFamily: 'serif',
                  pointerEvents: 'none'
                }}>
                  {city.name}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* TOOLTIP */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: Math.min(tooltip.x, window.innerWidth - 180),
          top: tooltip.y - 120,
          background: 'rgba(10,20,40,0.97)',
          border: '1px solid #ffd700',
          borderRadius: '12px',
          padding: '12px',
          zIndex: 1000,
          minWidth: '160px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffd700', marginBottom: '6px', fontFamily: 'serif' }}>
            {tooltip.city.flag} {tooltip.city.name}
          </div>
          <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '3px' }}>👥 {tooltip.city.users} Spieler</div>
          <div style={{ fontSize: '12px', color: '#ffd700', marginBottom: '10px' }}>💰 {tooltip.city.coins} ZC</div>
          <button
            onClick={() => setTooltip(null)}
            style={{
              width: '100%', background: '#e94560', border: 'none',
              borderRadius: '8px', color: '#fff', padding: '6px',
              fontSize: '12px', cursor: 'pointer', fontWeight: '600'
            }}
          >
            Reisen →
          </button>
        </div>
      )}

      {/* ZOOM BUTTONS */}
      <div style={{
        position: 'absolute', bottom: '20px', right: '16px',
        display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 100
      }}>
        {['+', '−'].map((btn, i) => (
          <button key={i} onClick={() => setTransform(t => ({
            ...t,
            scale: Math.min(Math.max(t.scale * (i === 0 ? 1.3 : 0.77), 0.5), 6)
          }))} style={{
            width: '36px', height: '36px',
            background: 'rgba(10,20,40,0.9)',
            border: '1px solid #ffd700',
            borderRadius: '8px', color: '#ffd700',
            fontSize: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{btn}</button>
        ))}
      </div>

      {/* LEGENDE */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '16px',
        background: 'rgba(10,20,40,0.85)',
        border: '1px solid rgba(255,215,0,0.3)',
        borderRadius: '10px', padding: '8px 12px', zIndex: 100
      }}>
        <div style={{ fontSize: '10px', color: '#ffd700', fontFamily: 'serif', marginBottom: '4px' }}>⚓ Legende</div>
        <div style={{ fontSize: '10px', color: '#aaa' }}>🏙️ Stadt anklicken</div>
        <div style={{ fontSize: '10px', color: '#aaa' }}>🔍 Pinch zum Zoomen</div>
      </div>

    </div>
  )
}
