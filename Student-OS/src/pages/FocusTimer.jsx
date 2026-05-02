import React, { useState, useEffect, useRef } from 'react'
import { useDNA } from '../context/DNAContext'
import HeroVideo from '../components/HeroVideo'

export default function FocusTimer() {
  const { addXP, incrementFocusSessions } = useDNA()
  const [mode, setMode] = useState('Focus Session') 
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef(null)

  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studentos_focus_history') || '{}') } catch { return {} }
  })

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current)
      setIsActive(false)
      handleComplete()
    }
    return () => clearInterval(timerRef.current)
  }, [isActive, timeLeft])

  function handleComplete() {
    if (mode === 'Focus Session') {
      addXP(30, 'Focus Session Complete')
      incrementFocusSessions()
      
      const today = new Date().toLocaleDateString()
      const newHistory = { ...history, [today]: (history[today] || 0) + 1 }
      setHistory(newHistory)
      localStorage.setItem('studentos_focus_history', JSON.stringify(newHistory))
     
      setMode('Short Break')
      setTimeLeft(5 * 60)
    } else {
      setMode('Focus Session')
      setTimeLeft(25 * 60)
    }
  }

  function toggleTimer() {
    setIsActive(!isActive)
  }

  function resetTimer() {
    setIsActive(false)
    setTimeLeft(mode === 'Focus Session' ? 25 * 60 : 5 * 60)
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const totalDuration = mode === 'Focus Session' ? 25 * 60 : 5 * 60
  const pct = ((totalDuration - timeLeft) / totalDuration) * 100
  const r = 120
  const circ = 2 * Math.PI * r
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const todayDate = new Date()
  const weekData = []
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayDate)
    d.setDate(d.getDate() - i)
    const dateStr = d.toLocaleDateString()
    weekData.push({
      day: days[d.getDay()],
      count: history[dateStr] || 0
    })
  }
  
  const maxCount = Math.max(...weekData.map(d => d.count), 1)

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Deep Work</div>
        <h1 className="section-title">Focus Timer</h1>
        <div className="section-sub">Build momentum with timed focus</div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--spacing-section)' }}>
       
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', border: '1px solid var(--hairline-strong)', borderRadius: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '4px', color: mode === 'Focus Session' ? 'var(--primary)' : 'var(--success)', marginBottom: 40 }}>
            {mode}
          </div>
          
          <div style={{ position: 'relative', width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <svg width="320" height="320" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
              <circle cx="160" cy="160" r={r} fill="none" stroke="var(--surface-elevated)" strokeWidth="2" />
              <circle cx="160" cy="160" r={r} fill="none" 
                stroke={mode === 'Focus Session' ? 'var(--primary)' : 'var(--success)'} 
                strokeWidth="4"
                strokeDasharray={circ} 
                strokeDashoffset={circ * (pct / 100)}
                strokeLinecap="square" 
                style={{ transition: 'stroke-dashoffset 1s linear' }} 
              />
            </svg>
            <div className={isActive ? 'heartbeat' : ''} style={{ fontFamily: 'var(--font-heading)', fontSize: 100, fontWeight: 400, color: 'var(--on-dark)', letterSpacing: '4px' }}>
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 24 }}>
            <button className="btn-primary" onClick={toggleTimer} style={{ width: 160, justifyContent: 'center' }}>
              {isActive ? 'PAUSE' : 'START'}
            </button>
            <button className="btn-secondary" onClick={resetTimer} style={{ width: 160, justifyContent: 'center' }}>
              RESET
            </button>
          </div>
        </div>

       
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card" style={{ flex: 1, borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0, padding: 40 }}>
            <div className="section-label">This Week</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, letterSpacing: '2px', color: 'var(--on-dark)', marginBottom: 40, textTransform: 'uppercase' }}>SESSION HISTORY</div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180, paddingBottom: 24, borderBottom: '1px solid var(--hairline-strong)' }}>
              {weekData.map((d, i) => {
                const heightPct = Math.max((d.count / maxCount) * 100, 2) 
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{d.count > 0 ? d.count : ''}</div>
                    <div style={{ 
                      width: '100%', maxWidth: 32, height: `${heightPct}%`, 
                      background: d.count > 0 ? 'var(--primary)' : 'var(--hairline-strong)', 
                      borderRadius: 0,
                      transition: 'height 0.5s var(--ease)'
                    }} />
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>{d.day}</div>
                  </div>
                )
              })}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 32 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>TOTAL FOCUS TIME</div>
                <div style={{ fontSize: 32, fontFamily: 'var(--font-heading)', color: 'var(--on-dark)', letterSpacing: '2px' }}>
                  {Math.round((Object.values(history).reduce((a, b) => a + b, 0) * 25) / 60)} HRS
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>TOTAL SESSIONS</div>
                <div style={{ fontSize: 32, fontFamily: 'var(--font-heading)', color: 'var(--primary)', letterSpacing: '2px' }}>
                  {Object.values(history).reduce((a, b) => a + b, 0)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0, padding: 32 }}>
            <h3 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase' }}>PRO TIP</h3>
            <p style={{ fontSize: 14, color: 'var(--text-strong)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              Use focus sessions to complete Daily Missions or tackle items on your Career Roadmap. Earning XP is tied directly to consistent, focused effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
