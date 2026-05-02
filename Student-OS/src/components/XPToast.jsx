import React from 'react'
import { useDNA } from '../context/DNAContext'

export default function XPToast() {
  const { xpGain } = useDNA()
  if (!xpGain) return null
  return (
    <div className="xp-toast" key={xpGain.id}>
      <div style={{ width: 12, height: 12, background: 'var(--primary)', animation: 'badgePulse 0.4s ease-out' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span className="xp-toast-amount">+{xpGain.amount} XP</span>
        <span className="xp-toast-label" style={{ fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase' }}>{xpGain.label}</span>
      </div>
    </div>
  )
}
