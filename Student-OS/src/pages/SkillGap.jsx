import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import { ROLE_SKILLS } from '../data/roleSkills'
import AnimatedCounter from '../components/AnimatedCounter'
import HeroVideo from '../components/HeroVideo'

export default function SkillGap() {
  const { dna, markSkillLearned } = useDNA()
  const required = ROLE_SKILLS[dna.dreamRole] || []
  const userSkills = dna.skills || []
  const have = required.filter(s => userSkills.includes(s))
  const missing = required.filter(s => !userSkills.includes(s))
  const pct = required.length ? Math.round((have.length / required.length) * 100) : 0

  const [barWidth, setBarWidth] = useState(0)
  const [flash, setFlash] = useState(false)
  
  const [detectedSkills, setDetectedSkills] = useState([])

  useEffect(() => {
    const t = setTimeout(() => {
      setBarWidth(pct)
      setFlash(true)
    }, 100)
    return () => clearTimeout(t)
  }, [pct])

  useEffect(() => {
    if (!dna.githubUsername) return
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${dna.githubUsername}/repos?per_page=100&sort=updated`)
        if (!res.ok) return
        const data = await res.json()
        const githubLanguages = [...new Set(data.map(r => r.language).filter(Boolean))]
        const languageToSkill = {
          'JavaScript': 'JavaScript',
          'TypeScript': 'TypeScript',
          'Python': 'Python',
          'Java': 'Java',
          'CSS': 'CSS',
          'HTML': 'HTML'
        }
        const detected = githubLanguages.map(lang => languageToSkill[lang]).filter(Boolean)
        setDetectedSkills(detected)
      } catch (e) {
       
      }
    }
    fetchRepos()
  }, [dna.githubUsername])

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">SYSTEM DIAGNOSTICS</div>
        <h1 className="section-title">Performance Gap</h1>
        <div className="section-sub">
          Continuous assessment of technical proficiency against {dna.dreamRole} standards. 
          Real-time synchronization with active repositories.
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--s-12)', alignItems: 'start' }}>
        
        <div className="card" style={{ padding: 'var(--s-8)', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>TOTAL COMPLIANCE</div>
          <div style={{ 
            fontFamily: 'var(--font-heading)', fontSize: 160, fontWeight: 300, lineHeight: 0.9, letterSpacing: '-2px',
            color: pct === 100 ? 'var(--success)' : 'var(--on-dark)',
            animation: flash ? 'greenFlash 0.6s ease 0.8s' : 'none',
            margin: 'var(--s-4) 0'
          }}>
            <AnimatedCounter value={pct} />
            <span style={{ fontSize: 40, verticalAlign: 'top', marginLeft: 8 }}>%</span>
          </div>
          
          <div style={{ maxWidth: 320, margin: '0 auto' }}>
            <div className="progress-bar-track" style={{ height: 1, background: 'var(--hairline-strong)' }}>
              <div className="progress-bar-fill" style={{ width: `${barWidth}%`, background: 'var(--primary)' }} />
            </div>
          </div>
          
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted-soft)', marginTop: 'var(--s-4)', letterSpacing: '3px' }}>
            {have.length} / {required.length} OPERATIONAL COMPETENCIES
          </div>
        </div>

       
        <div className="card-elevated" style={{ padding: 'var(--s-8)' }}>
          <div className="section-label">DNA ARCHITECTURE</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, letterSpacing: '4px', color: 'var(--on-dark)', marginBottom: 'var(--s-4)' }}>
            CURRENT PROFILE: {dna.dreamRole.toUpperCase()}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            <div style={{ borderLeft: '1px solid var(--hairline-strong)', paddingLeft: 'var(--s-4)' }}>
              <div className="section-label" style={{ marginBottom: 8 }}>PRIMARY STATUS</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--text-strong)' }}>
                {pct >= 80 ? 'OPTIMIZED' : pct >= 50 ? 'DEVELOPING' : 'INITIAL PHASE'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--hairline-strong)', paddingLeft: 'var(--s-4)' }}>
              <div className="section-label" style={{ marginBottom: 8 }}>SYSTEM SYNC</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--text-strong)' }}>
                {dna.githubUsername ? 'ACTIVE CONNECTION' : 'MANUAL MODE'}
              </div>
            </div>
          </div>
          
          <button className="btn-secondary" style={{ marginTop: 'var(--s-6)', width: '100%' }} onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}>
            VIEW SPECIFICATIONS ↓
          </button>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--s-16)' }}>
      
        <div>
          <div className="section-label">VERIFIED ASSETS</div>
          <div className="card" style={{ borderTop: '4px solid var(--primary)', padding: 'var(--s-6)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {have.length === 0
                ? <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: 16 }}>No required competencies verified.</div>
                : have.map(s => (
                  <div key={s} className="chip selected" style={{ padding: '10px 20px', border: '1px solid var(--primary)' }}>
                    {s} <span style={{ marginLeft: 8, opacity: 0.4 }}>✓</span>
                  </div>
                ))
              }
            </div>
            
            {userSkills.filter(s => !required.includes(s)).length > 0 && (
              <div style={{ marginTop: 'var(--s-8)', borderTop: '1px solid var(--hairline)', paddingTop: 'var(--s-6)' }}>
                <div className="section-label" style={{ marginBottom: 'var(--s-4)' }}>AUXILIARY CAPABILITIES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {userSkills.filter(s => !required.includes(s)).map(s => (
                    <span key={s} className="chip" style={{ opacity: 0.6 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      
        <div>
          <div className="section-label">PENDING INTEGRATION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            {missing.length === 0
              ? (
                <div className="card-elevated" style={{ textAlign: 'center', padding: 'var(--s-10)' }}>
                  <div style={{ color: 'var(--success)', fontSize: 24, fontFamily: 'var(--font-heading)', letterSpacing: '4px' }}>MAXIMUM COMPLIANCE</div>
                  <div style={{ color: 'var(--text-muted)', marginTop: 12 }}>All required systems are operational.</div>
                </div>
              )
              : missing.map((s, idx) => {
                const isDetected = detectedSkills.includes(s)
                return (
                  <div key={s} className="card page-enter" style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                    animationDelay: `${idx * 100}ms`,
                    borderLeft: isDetected ? '4px solid var(--warning)' : '1px solid var(--hairline-strong)',
                    padding: 'var(--s-5) var(--s-6)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--on-dark)', letterSpacing: '3px' }}>{s.toUpperCase()}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
                        Structural requirement for {dna.dreamRole}
                      </div>
                      {isDetected && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--warning)' }}>
                          <div style={{ width: 6, height: 6, background: 'var(--warning)', borderRadius: '50%' }} />
                          RECOGNIZED IN ACTIVE CODEBASE
                        </div>
                      )}
                    </div>
                    <button className="btn-secondary" style={{ padding: '12px 24px', fontSize: 10 }} onClick={() => markSkillLearned(s)}>
                      {isDetected ? 'SYNCHRONIZE' : 'INTEGRATE'}
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
