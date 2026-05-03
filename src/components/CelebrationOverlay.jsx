import React, { useEffect, useState } from 'react'
import { useDNA } from '../context/DNAContext'
import './CelebrationOverlay.css'

function randomParticles(n) {
  return Array.from({ length: n }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = 80 + Math.random() * 200
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance
    return {
      id: i,
      x: 50, 
      y: 50,
      tx: `${tx}px`,
      ty: `${ty}px`,
      delay: Math.random() * 0.1,
    }
  })
}

export default function CelebrationOverlay() {
  const { celebrationSkill, clearCelebration } = useDNA()
  const [xpCount, setXpCount] = useState(0)
  const [particles] = useState(() => randomParticles(30))
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (!celebrationSkill) { setXpCount(0); setFadeOut(false); return }
    let current = 0
    const target = 50
    const id = setInterval(() => {
      current += 2
      if (current >= target) {
        current = target
        clearInterval(id)
      }
      setXpCount(current)
    }, 20)
    
    const closeTimer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => clearCelebration(), 300)
    }, 2500)
    
    return () => { clearInterval(id); clearTimeout(closeTimer) }
  }, [celebrationSkill, clearCelebration])

  if (!celebrationSkill) return null

  return (
    <div className="celebration-overlay" style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.3s var(--ease)' }} onClick={() => { setFadeOut(true); setTimeout(clearCelebration, 300) }}>
      {particles.map(p => (
        <div key={p.id} className="celebration-particle" style={{
          left: `${p.x}%`, top: `${p.y}%`,
          '--translate-end': `translate(${p.tx}, ${p.ty})`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
      <div className="celebration-card" onClick={e => e.stopPropagation()}>
        <div className="celebration-emoji">🏆</div>
        <div className="celebration-eyebrow">SKILL UNLOCKED</div>
        <h2 className="celebration-skill">{celebrationSkill}</h2>
        <div className="celebration-xp">+{xpCount} XP</div>
        <p className="celebration-sub">Added to your Career DNA</p>
        <button className="btn-primary" onClick={() => { setFadeOut(true); setTimeout(clearCelebration, 300) }} style={{ marginTop: 8 }}>
          Keep Going →
        </button>
      </div>
    </div>
  )
}
