'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const cities = [
  { name: 'München', flag: '🇩🇪', lat: 48.137, lng: 11.576, users: 342, coins: '2.4M' },
  { name: 'Berlin', flag: '🇩🇪', lat: 52.520, lng: 13.405, users: 891, coins: '8.1M' },
  { name: 'Paris', flag: '🇫🇷', lat: 48.853, lng: 2.350, users: 1204, coins: '15.3M' },
  { name: 'London', flag: '🇬🇧', lat: 51.507, lng: -0.128, users: 1567, coins: '22.7M' },
  { name: 'New York', flag: '🇺🇸', lat: 40.712, lng: -74.006, users: 2341, coins: '48.2M' },
  { name: 'Tokyo', flag: '🇯🇵', lat: 35.682, lng: 139.691, users: 1893, coins: '31.5M' },
  { name: 'Dubai', flag: '🇦🇪', lat: 25.204, lng: 55.270, users: 654, coins: '19.8M' },
  { name: 'São Paulo', flag: '🇧🇷', lat: -23.550, lng: -46.633, users: 987, coins: '12.4M' },
  { name: 'Sydney', flag: '🇦🇺', lat: -33.868, lng: 151.209, users: 445, coins: '7.2M' },
  { name: 'Mumbai', flag: '🇮🇳', lat: 19.076, lng: 72.877, users: 1123, coins: '9.6M' },
  { name: 'Lagos', flag: '🇳🇬', lat: 6.524, lng: 3.379, users: 334, coins: '3.1M' },
  { name: 'Moskau', flag: '🇷🇺', lat: 55.751, lng: 37.618, users: 778, coins: '11.2M' },
]

function CityMarker({ city }) {
  const icon = L.divIcon({
    className: '',
    html: `
      <div style="
        background: rgba(22,33,62,0.95);
        border: 2px solid #e94560;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 0 12px rgba(233,69,96,0.6);
        cursor: pointer;
      ">${city.flag}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

  return (
    <Marker position={[city.lat, city.lng]} icon={icon}>
      <Popup>
        <div style={{
          background: '#16213e',
          color: '#fff',
          padding: '12px',
          borderRadius: '10px',
          minWidth: '160px',
          border: '1px solid #e94560'
        }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
            {city.flag} {city.name}
          </div>
          <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>
            👥 {city.users} Spieler online
          </div>
          <div style={{ fontSize: '13px', color: '#ffd700', marginBottom: '8px' }}>
            💰 {city.coins} ZC im Umlauf
          </div>
          <button style={{
            background: '#e94560',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: '600'
          }}>
            Reisen →
          </button>
        </div>
      </Popup>
    </Marker>
  )
}

export default function Map() {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {cities.map((city, i) => (
        <CityMarker key={i} city={city} />
      ))}
    </MapContainer>
  )
}
