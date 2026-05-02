import React, { useEffect, useState } from 'react'
import { useDNA } from '../context/DNAContext'
import { ROLE_SKILLS } from '../data/roleSkills'
import AnimatedCounter from '../components/AnimatedCounter'
import { useNavigate } from 'react-router-dom'
import HeroVideo from '../components/HeroVideo'

export default function Dashboard() {
  const { dna, levelInfo } = useDNA()
  const navigate = useNavigate()
  const [githubUser, setGithubUser] = useState(null)
  const required = ROLE_SKILLS[dna.dreamRole] || []
  const have = (dna.skills || []).filter(s => required.includes(s))
  const missing = required.filter(s => !(dna.skills || []).includes(s))
  const xp = dna.xp || 0

  const today = new Date().toLocaleDateString()
  const missions = JSON.parse(localStorage.getItem('studentos_missions_today') || '{}')
  const todayMissions = missions.date === today ? missions.tasks : []

  const greetingText = `Good ${getGreeting()}, ${dna.dreamRole}`.split(' ')

  useEffect(() => {
    if (!dna.githubUsername) return
    let abortController = new AbortController()
    fetch(`https://api.github.com/users/${dna.githubUsername}`, { signal: abortController.signal })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setGithubUser(data) })
      .catch(() => {})
    return () => abortController.abort()
  }, [dna.githubUsername])

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">SYSTEM OVERVIEW</div>
        <h1 className="section-title">
          {greetingText.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', animation: `fadeUp 0.4s var(--ease) ${i * 80}ms both`, marginRight: '0.4em' }}>
              {word}
            </span>
          ))}
        </h1>
        <div className="section-sub" style={{ marginBottom: 0 }}>
          Operational status verified. Career DNA sequence initialized for {dna.dreamRole}.
        </div>
      </div>

     
      <div className="card-elevated" style={{ marginBottom: 'var(--s-12)', borderTop: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-10)' }}>
          {githubUser?.avatar_url ? (
            <div style={{ width: 140, height: 140, border: '1px solid var(--hairline-strong)', padding: 4 }}>
              <img src={githubUser.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <XPRing xp={xp} levelInfo={levelInfo} />
          )}
          
          <div style={{ flex: 1 }}>
            <div className="section-label">DNA SEQUENCE</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 40, letterSpacing: '4px', color: 'var(--on-dark)', textTransform: 'uppercase' }}>
              {dna.dreamRole}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
              {dna.degree}
            </div>
            
            <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, background: 'var(--primary)' }} />
                <span className="font-mono" style={{ color: 'var(--on-dark)' }}>LV.{dna.level} {levelInfo?.title.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, background: 'var(--warning)' }} />
                <span className="font-mono" style={{ color: 'var(--on-dark)' }}>{dna.streak || 0} DAY STREAK</span>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <button className="btn-primary" onClick={() => navigate('/profile')}>
              MANAGE DNA
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid-4" style={{ marginBottom: 'var(--s-12)' }}>
        <div className="stat-card">
          <div className="stat-card-label">Verification Rate</div>
          <div className="stat-card-value"><AnimatedCounter value={have.length} /></div>
          <div className="stat-card-sub">Verified / {required.length} Required</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">System Disparity</div>
          <div className="stat-card-value"><AnimatedCounter value={missing.length} /></div>
          <div className="stat-card-sub">Deficit Competencies</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Operating Level</div>
          <div className="stat-card-value"><AnimatedCounter value={dna.level || 1} /></div>
          <div className="stat-card-sub">Rank: {levelInfo?.title}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Persistence</div>
          <div className="stat-card-value"><AnimatedCounter value={dna.streak || 0} /></div>
          <div className="stat-card-sub">Days Active Sequence</div>
        </div>
      </div>

      
      <div className="grid-2">
        <div className="card">
          <div className="section-label">MISSION LOG</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: '4px', color: 'var(--on-dark)', marginBottom: 32 }}>PRIORITY OBJECTIVES</div>
          {todayMissions.length === 0
            ? <div style={{ color: 'var(--text-muted-soft)', fontSize: 14, fontStyle: 'italic' }}>No active objectives. Initialize via Missions console.</div>
            : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {todayMissions.slice(0, 3).map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted-soft)', width: 24 }}>{(i+1).toString().padStart(2, '0')}</div>
                    <div style={{ flex: 1, borderBottom: '1px solid var(--hairline)', paddingBottom: 12 }}>
                      <div style={{ fontSize: 16, color: 'var(--on-dark)', fontFamily: 'var(--font-body)', letterSpacing: '0.5px' }}>{m.task}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '2px', color: 'var(--text-muted)' }}>+{m.xp} XP</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '2px', color: 'var(--primary)', opacity: 0.5 }}>STATUS: ACTIVE</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>
        <div className="card">
          <div className="section-label">ENGINE ANALYTICS</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: '4px', color: 'var(--on-dark)', marginBottom: 32 }}>CRITICAL COMPETENCIES</div>
          {missing.slice(0, 4).map(s => (
            <div key={s} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '2px' }}>
                <span>{s.toUpperCase()}</span><span>0%</span>
              </div>
              <div className="progress-bar-track" style={{ height: 1 }}><div className="progress-bar-fill" style={{ width: '0%', background: 'var(--primary)' }} /></div>
            </div>
          ))}
          {missing.length === 0 && <div style={{ color: 'var(--success)', fontSize: 14, fontFamily: 'var(--font-mono)', letterSpacing: '2px' }}>ALL SYSTEMS OPERATIONAL.</div>}
        </div>
      </div>
    </div>
  )
}

function XPRing({ xp, levelInfo }) {
  const pct = levelInfo?.progress || 0
  const r = 44; const circ = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: 104, height: 104, flexShrink: 0, animation: 'pulse 3s infinite ease-in-out' }}>
      <svg width="104" height="104" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle cx="52" cy="52" r={r} fill="none" stroke="var(--accent)" strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={circ - (circ * pct) / 100}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s var(--ease)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: 'var(--accent)' }}><AnimatedCounter value={xp} /></span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase' }}>XP</span>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  return 'Evening'
}
