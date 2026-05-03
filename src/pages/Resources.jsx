import React, { useState } from 'react'
import { useDNA } from '../context/DNAContext'
import { RESOURCES_DATA } from '../data/resourcesData'
import { ROLE_SKILLS } from '../data/roleSkills'
import HeroVideo from '../components/HeroVideo'

export default function Resources() {
  const { dna } = useDNA()
  const [filterType, setFilterType] = useState('All')
  const [showKnown, setShowKnown] = useState(false)

  const required = ROLE_SKILLS[dna.dreamRole] || []
  const userSkills = dna.skills || []
  const missing = required.filter(s => !userSkills.includes(s))

  let filteredResources = RESOURCES_DATA.filter(r => {
    
    if (!required.includes(r.skill)) return false
    
 
    if (!showKnown && !missing.includes(r.skill)) return false
    
   
    if (filterType !== 'All' && r.type !== filterType) return false
    
    return true
  })

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Knowledge Base</div>
        <h1 className="section-title">Resource Library</h1>
        <div className="section-sub">Curated materials for your skill gaps</div>
      </div>

      <style>{`
        .pill-tabs {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111;
          padding: 6px;
          border-radius: 9999px;
          border: 1px solid var(--hairline-strong);
          flex: 1;
          max-width: 900px;
        }
        .pill-btn {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--text-muted);
          border: none;
          background: transparent;
          transition: all 0.3s var(--ease);
          cursor: pointer;
        }
        .pill-btn:hover {
          color: var(--on-dark);
        }
        .pill-active {
          color: #fff !important;
          background: #2563EB !important;
        }
        @media (max-width: 768px) {
          .pill-tabs {
            overflow-x: auto;
            white-space: nowrap;
            justify-content: flex-start;
          }
          .pill-btn {
            flex: 0 0 auto;
            padding: 10px 24px;
          }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 64, borderBottom: '1px solid var(--hairline-strong)', paddingBottom: 16 }}>
        <div className="pill-tabs">
          {['All', 'Videos', 'Articles', 'Courses'].map(t => (
            <button
              key={t}
              className={filterType === t ? 'pill-btn pill-active' : 'pill-btn'}
              onClick={() => setFilterType(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SHOW SKILLS I KNOW</span>
          <div 
            style={{ 
              width: 40, height: 20, borderRadius: 0, border: '1px solid',
              borderColor: showKnown ? 'var(--primary)' : 'var(--hairline-strong)',
              background: 'transparent',
              position: 'relative', cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => setShowKnown(!showKnown)}
          >
            <div style={{ 
              width: 16, height: 16, borderRadius: 0, background: showKnown ? 'var(--primary)' : 'var(--hairline-strong)',
              position: 'absolute', top: 1, left: showKnown ? 21 : 1,
              transition: 'left 0.3s, background 0.3s'
            }} />
          </div>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--spacing-section)' }}>
        {filteredResources.map((r, i) => {
          const isMissing = missing.includes(r.skill)
          return (
            <div key={i} className="card stagger-item" style={{ animationDelay: `${i * 50}ms`, display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0, padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <span className={`badge`} style={{ 
                  background: 'transparent',
                  border: '1px solid',
                  borderColor: isMissing ? 'var(--danger)' : 'var(--success)', 
                  color: isMissing ? 'var(--danger)' : 'var(--success)',
                  borderRadius: 0,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>
                  {r.skill}
                </span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {r.type}
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontFamily: 'var(--font-heading)', color: 'var(--on-dark)', marginBottom: 16, lineHeight: 1.4, letterSpacing: '1px', textTransform: 'uppercase' }}>{r.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--hairline-strong)' }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SOURCE: {r.source}</div>
                <a 
                  href={r.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--primary)', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  VISIT ↗
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', borderRadius: 0, border: '1px solid var(--hairline-strong)' }}>
          NO RESOURCES FOUND FOR THE CURRENT FILTERS.
        </div>
      )}
    </div>
  )
}
