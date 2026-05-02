import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import { MISSIONS_DATA } from '../data/missionsData'
import HeroVideo from '../components/HeroVideo'

export default function Missions() {
  const { dna, addXP, completeMission, incrementStreak } = useDNA()
  const todayDate = new Date().toLocaleDateString()
  const [missions, setMissions] = useState([])
  const [completed, setCompleted] = useState([])
  const [streakAwarded, setStreakAwarded] = useState(false)
  const [activeRipple, setActiveRipple] = useState(null)
  const [activePulse, setActivePulse] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('studentos_missions_today')
    let currentMissions = []
    let currentCompleted = []

    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (parsed.date === todayDate) {
          currentMissions = parsed.tasks || []
          currentCompleted = parsed.completed || []
        }
      } catch (e) {}
    }

    if (currentMissions.length === 0) {
      const roleMissions = MISSIONS_DATA[dna.dreamRole] || []
      const shuffled = [...roleMissions].sort(() => 0.5 - Math.random())
      currentMissions = shuffled.slice(0, 3)
      localStorage.setItem('studentos_missions_today', JSON.stringify({
        date: todayDate,
        tasks: currentMissions,
        completed: []
      }))
    }

    setMissions(currentMissions)
    setCompleted(currentCompleted)
  }, [dna.dreamRole, todayDate])

  useEffect(() => {
    if (missions.length > 0 && completed.length === missions.length && !streakAwarded) {
      incrementStreak()
      setStreakAwarded(true)
    }
  }, [completed, missions, streakAwarded, incrementStreak])

  function handleCheck(m, index) {
    if (completed.includes(m.id)) return
    
    setActiveRipple(index)
    setActivePulse(index)
    
    const newCompleted = [...completed, m.id]
    setCompleted(newCompleted)
    
    localStorage.setItem('studentos_missions_today', JSON.stringify({
      date: todayDate,
      tasks: missions,
      completed: newCompleted
    }))
    
    addXP(m.xp, 'Mission Complete')
    completeMission(m.id)

    setTimeout(() => {
      setActiveRipple(null)
      setActivePulse(null)
    }, 400)
  }

  const isAllDone = missions.length > 0 && completed.length === missions.length

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Daily Execution</div>
        <h1 className="section-title">Missions</h1>
        <div className="section-sub">Complete 3 daily tasks</div>
      </div>

      {isAllDone && (
        <div className="mission-banner card" style={{ background: 'var(--primary)', color: '#000', marginBottom: 40, padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 24, borderRadius: 0, border: 'none' }}>
          <span style={{ fontSize: 32 }}>🔥</span>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: '2px', textTransform: 'uppercase' }}>All missions complete</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '2px', opacity: 0.8, marginTop: 4, textTransform: 'uppercase' }}>Day Streak +1. See you tomorrow.</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 'var(--spacing-section)' }}>
        {missions.map((m, i) => {
          const isDone = completed.includes(m.id)
          return (
            <div key={m.id} className="card page-enter" style={{ 
              display: 'flex', gap: 24, alignItems: 'center', cursor: isDone ? 'default' : 'pointer',
              opacity: isDone ? 0.5 : 1, transition: 'border-color 0.3s, opacity 0.3s',
              animationDelay: `${i * 100}ms`,
              transform: 'translateY(10px)',
              border: '1px solid',
              borderColor: isDone ? 'var(--hairline)' : 'var(--hairline-strong)',
              padding: '32px',
              borderRadius: 0,
              background: 'transparent'
            }} onClick={() => handleCheck(m, i)}>
              <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className={`custom-checkbox${isDone ? ' checked' : ''}`} style={{ width: 24, height: 24, borderRadius: 0 }}>
                  {isDone && '✓'}
                </div>
                {activeRipple === i && <div className="ripple-circle" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontFamily: 'var(--font-heading)', color: isDone ? 'var(--text-muted)' : 'var(--on-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  <span className={isDone ? 'strikethrough' : ''}>{m.task}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <span className={`badge ${activePulse === i ? 'badge-pulse' : ''}`} style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}>+{m.xp} XP</span>
                  <span className="badge" style={{ border: '1px solid var(--warning)', color: 'var(--warning)' }}>{m.type}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
