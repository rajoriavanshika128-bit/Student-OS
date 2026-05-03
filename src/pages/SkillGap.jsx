import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import { ROLE_SKILLS } from '../data/roleSkills'
import AnimatedCounter from '../components/AnimatedCounter'
import HeroVideo from '../components/HeroVideo'
const skillDescriptions = {
  'HTML': 'Fundamental markup language for structuring web interfaces.',
  'CSS': 'Styling language for visually enhancing web interfaces.',
  'JavaScript': 'Core scripting language for dynamic functionality.',
  'React': 'Component-based UI library for modern frontends.',
  'Git': 'Version control system for source code management.',
  'Figma': 'Collaborative interface design and prototyping tool.',
  'TypeScript': 'Strongly typed programming language over JavaScript.',
  'APIs': 'Application Programming Interfaces for backend integration.',
  'Python': 'High-level language for backend and data tasks.',
  'Node.js': 'JavaScript runtime for building scalable servers.',
  'SQL': 'Domain-specific language for managing databases.',
  'Java': 'Object-oriented language for enterprise applications.',
  'Docker': 'Platform for containerized applications.',
  'Prototyping': 'Process of creating preliminary interface versions.',
  'Typography': 'Art and technique of arranging type for legibility.',
  'Color Theory': 'Principles for combining colors effectively.',
  'Excel': 'Spreadsheet software for data organization.',
  'Statistics': 'Mathematical body of science for data analysis.',
  'Visualization': 'Graphical representation of information and data.',
  'R': 'Programming language for statistical computing.',
  'Roadmapping': 'Strategic planning process for product development.',
  'Analytics': 'Systematic computational analysis of data.',
  'Communication': 'Conveying information effectively across teams.',
  'Agile': 'Iterative approach to software delivery.',
  'Research': 'Systematic investigation to reach new conclusions.',
  'Linux': 'Open-source operating system widely used in servers.',
  'CI/CD': 'Continuous Integration and Deployment practices.',
  'AWS': 'Amazon Web Services cloud computing platform.',
  'Kubernetes': 'Container orchestration system for automating deployment.',
  'Networking': 'Practice of linking computing devices together.'
}

export default function SkillGap() {
  const [showSpecsModal, setShowSpecsModal] = useState(false)
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
            animation: flash ? 'greenFlash 0.6s ease' : 'none',
            margin: 'var(--s-4) 0'
          }}>
            <AnimatedCounter value={pct} onComplete={() => setFlash(true)} />
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
          
          <button className="btn-secondary" style={{ marginTop: 'var(--s-6)', width: '100%' }} onClick={() => setShowSpecsModal(true)}>
            VIEW SPECIFICATIONS
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
                    {s} 
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
                  <div key={s} className="card" style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animationName: 'fadeSlideUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    animationFillMode: 'both',
                    animationDelay: `${300 + idx * 80}ms`,
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
                    <button className="btn-secondary" style={{ padding: '12px 24px', fontSize: 10 }} onClick={() => {
                      markSkillLearned(s)
                      const today = new Date().toISOString().split('T')[0]
                      const existingLog = JSON.parse(localStorage.getItem('activityLog') || '[]')
                      existingLog.push(today)
                      localStorage.setItem('activityLog', JSON.stringify(existingLog))
                    }}>
                      {isDetected ? 'SYNCHRONIZE' : 'INTEGRATE'}
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {showSpecsModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="card-elevated" style={{
            width: '100%',
            maxWidth: 600,
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: 'var(--s-6)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowSpecsModal(false)}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'transparent',
                border: '1px solid var(--hairline-strong)',
                color: 'var(--text-muted)',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.2s var(--ease)'
              }}
              onMouseOver={e => { e.currentTarget.style.color = 'var(--on-dark)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--hairline-strong)'; }}
            >
              X
            </button>
            <div className="section-label">SPECIFICATIONS</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'var(--on-dark)', marginBottom: 32, textTransform: 'uppercase' }}>
              {dna.dreamRole}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {required.map(s => {
                const isAcquired = userSkills.includes(s)
                return (
                  <div key={s} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingBottom: 16,
                    borderBottom: '1px solid var(--hairline)'
                  }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--on-dark)', marginBottom: 4 }}>
                        {s.toUpperCase()}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)' }}>
                        {skillDescriptions[s] || `Core competency for ${dna.dreamRole}.`}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '2px',
                      padding: '4px 8px',
                      border: `1px solid ${isAcquired ? 'var(--success)' : 'var(--warning)'}`,
                      color: isAcquired ? 'var(--success)' : 'var(--warning)',
                      marginTop: 4
                    }}>
                      {isAcquired ? 'ACQUIRED' : 'PENDING'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
