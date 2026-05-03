import React from 'react'
import { useDNA } from '../context/DNAContext'
import { PROJECTS_DATA } from '../data/projectsData'
import HeroVideo from '../components/HeroVideo'

export default function Projects() {
  const { dna } = useDNA()
  const projects = PROJECTS_DATA[dna.dreamRole] || []
  const userSkills = dna.skills || []

  function getDiffColor(diff) {
    if (diff === 'Beginner') return 'var(--success)'
    if (diff === 'Intermediate') return 'var(--amber)'
    return 'var(--danger)'
  }

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Build Your Portfolio</div>
        <h1 className="section-title">Project Ideas</h1>
        <div className="section-sub">Real-world projects for {dna.dreamRole}</div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--spacing-section)' }}>
        {projects.map((p, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 40, borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <h3 style={{ fontSize: 32, fontFamily: 'var(--font-heading)', color: 'var(--on-dark)', letterSpacing: '2px', textTransform: 'uppercase' }}>{p.title}</h3>
              <span className="badge" style={{ 
                border: `1px solid ${getDiffColor(p.difficulty)}`, 
                color: getDiffColor(p.difficulty),
                background: 'transparent',
                borderRadius: 0,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                {p.difficulty}
              </span>
            </div>
            
            <p style={{ fontSize: 16, color: 'var(--text)', marginBottom: 32, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              {p.desc}
            </p>
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--hairline-strong)', paddingTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 16, opacity: 0.5 }}>⏱</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>EST. {p.hours} HOURS</span>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {p.skills.map(s => {
                  const hasSkill = userSkills.includes(s)
                  return (
                    <span key={s} className="chip" style={{ 
                      borderRadius: 0, 
                      border: `1px solid ${hasSkill ? 'var(--success)' : 'var(--warning)'}`, 
                      color: hasSkill ? 'var(--success)' : 'var(--warning)', 
                      background: 'transparent',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '2px',
                      textTransform: 'uppercase'
                    }}>
                      {s}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
