import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import { ROADMAP_DATA } from '../data/roadmapData'
import HeroVideo from '../components/HeroVideo'

export default function Roadmap() {
  const { dna, addXP } = useDNA()
  const milestones = ROADMAP_DATA[dna.dreamRole] || []
  const [expanded, setExpanded] = useState(0)
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studentos_roadmap') || '{}') } catch { return {} }
  })

  function toggle(milestoneIdx, taskIdx) {
    const key = `${milestoneIdx}-${taskIdx}`
    if (checked[key]) return
    const next = { ...checked, [key]: true }
    setChecked(next)
    localStorage.setItem('studentos_roadmap', JSON.stringify(next))
    addXP(20, 'Roadmap Task')
  }

  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLineHeight(100), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Your Journey</div>
        <h1 className="section-title">Career Roadmap</h1>
        <div className="section-sub">Month-by-month milestones for {dna.dreamRole}</div>
      </div>

      <div style={{ position: 'relative', paddingLeft: 40, overflow: 'hidden', marginBottom: 'var(--spacing-section)', marginLeft: 20 }}>
       
        <div style={{ 
          position: 'absolute', left: 23, top: 0, width: 1, background: 'var(--hairline-strong)',
          height: `${lineHeight}%`, transition: 'height 1.2s ease-out'
        }} />

        {milestones.map((m, mi) => {
          const isOpen = expanded === mi
          const milestoneChecked = m.tasks.filter((_, ti) => checked[`${mi}-${ti}`]).length
          const isCurrent = m.current
          return (
            <div key={mi} className="page-enter" style={{ marginBottom: 40, position: 'relative', animationDelay: `${mi * 150}ms`, transform: 'translateX(20px)' }}>
            
              <div style={{
                position: 'absolute', left: -20, top: 24,
                width: 7, height: 7, borderRadius: '0',
                background: isCurrent ? 'var(--primary)' : milestoneChecked === m.tasks.length ? 'var(--success)' : 'var(--canvas)',
                border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--hairline-strong)'}`,
                zIndex: 1,
                transform: 'translateX(-50%)'
              }} />

              <div className="card" style={{
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isCurrent ? 'var(--primary)' : 'var(--hairline-strong)',
                marginLeft: 24,
                padding: 40,
                borderRadius: 0,
                background: 'transparent'
              }} onClick={() => setExpanded(isOpen ? -1 : mi)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>{m.month}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, letterSpacing: '2px', color: 'var(--on-dark)', textTransform: 'uppercase' }}>{m.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase' }}>{milestoneChecked}/{m.tasks.length} TASKS DONE</div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    {isCurrent && <span className="badge" style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}>CURRENT</span>}
                    <span style={{ color: 'var(--on-dark)', fontSize: 24, fontFamily: 'var(--font-mono)' }}>{isOpen ? '−' : '+'}</span>
                  </div>
                </div>

                <div style={{ 
                  maxHeight: isOpen ? 800 : 0, 
                  overflow: 'hidden', 
                  transition: 'max-height 0.4s var(--ease), opacity 0.4s var(--ease)',
                  opacity: isOpen ? 1 : 0
                }}>
                  <div style={{ marginTop: 32, borderTop: '1px solid var(--hairline-strong)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {m.tasks.map((task, ti) => {
                      const isDone = !!checked[`${mi}-${ti}`]
                      return (
                        <div key={ti} onClick={e => { e.stopPropagation(); toggle(mi, ti) }}
                          style={{ display: 'flex', gap: 16, alignItems: 'flex-start', cursor: 'pointer', padding: '16px', border: '1px solid', borderColor: isDone ? 'var(--success)' : 'var(--hairline-strong)', background: 'transparent', transition: 'border-color 0.2s' }}>
                          <div className={`custom-checkbox${isDone ? ' checked' : ''}`} style={{ marginTop: 2 }}>
                            {isDone && '✓'}
                          </div>
                          <span style={{ fontSize: 16, color: isDone ? 'var(--text-muted)' : 'var(--text)', textDecoration: isDone ? 'line-through' : 'none', fontFamily: 'var(--font-body)' }}>{task}</span>
                          {!isDone && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px', color: 'var(--warning)', flexShrink: 0 }}>+20 XP</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
