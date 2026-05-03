import React, { useState, useEffect, useRef } from 'react'
import { useDNA } from '../context/DNAContext'
import { PROJECTS_DATA } from '../data/projectsData'
import HeroVideo from '../components/HeroVideo'

export default function Projects() {
  const { dna } = useDNA()
  const projects = PROJECTS_DATA[dna.dreamRole] || []
  const userSkills = dna.skills || []
  const [selectedProject, setSelectedProject] = useState(null)
  const detailCardRef = useRef(null)

  useEffect(() => {
    if (selectedProject && detailCardRef.current) {
      detailCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedProject])

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function getDiffColor(diff) {
    if (diff === 'Beginner') return 'var(--success)'
    if (diff === 'Intermediate') return 'var(--amber)'
    return 'var(--danger)'
  }

  const getExtendedDetails = (p) => {
    return {
      overview: `${p.desc} This project is designed to simulate a real-world development environment. You will be building a complete solution from scratch, encountering typical edge cases and architectural decisions along the way. It is perfect for developers looking to solidify their understanding of core concepts and build a standout portfolio piece.`,
      features: [
        'Responsive layout across desktop, tablet, and mobile',
        'State management for application data',
        'Integration with mock or public APIs',
        'Performance optimization and accessibility best practices'
      ]
    }
  }

  return (
    <div className="page-enter">
      <style>{`
        .project-card-clickable { cursor: pointer; transition: border-color 0.3s; }
        .project-card-clickable:hover { border-color: #C9A96E !important; }

        .detail-card {
          background: var(--surface-card);
          border: 1px solid var(--hairline-strong);
          border-left: 2px solid var(--primary);
          border-radius: 0;
          width: 100%;
          padding: 40px;
          position: relative;
          margin-bottom: 0px;
          grid-column: 1 / -1;
          animation: fadeSlideDown 0.3s var(--ease);
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: none; }
        }
        .modal-close-btn {
          position: absolute;
          top: 24px; right: 24px;
          background: transparent;
          border: 1px solid var(--hairline-strong);
          border-radius: 0;
          padding: 8px 16px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); font-size: 11px; font-family: var(--font-mono); letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
          transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
          border-color: var(--primary);
          color: var(--on-dark);
        }
        .modal-top { margin-bottom: 32px; }
        .modal-type-badge {
          display: inline-block; padding: 4px 8px; border: 1px solid var(--primary);
          color: var(--primary); font-family: var(--font-mono); font-size: 10px;
          text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;
          border-radius: 9999px;
        }
        .modal-job-title {
          font-family: var(--font-heading); font-size: 32px; color: var(--on-dark);
          text-transform: uppercase; margin-bottom: 8px;
        }
        .modal-job-company {
          font-family: var(--font-mono); font-size: 14px; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 2px;
        }
        .modal-meta-row {
          display: flex; gap: 32px; margin-bottom: 32px; padding-bottom: 32px;
          border-bottom: 1px solid var(--hairline-strong);
        }
        .modal-meta-item { display: flex; flex-direction: column; gap: 8px; }
        .modal-meta-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; }
        .modal-meta-value { color: var(--on-dark); font-size: 14px; }
        .modal-section { margin-bottom: 32px; }
        .modal-section-label { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
        .modal-desc { font-family: var(--font-body); font-size: 16px; color: var(--text); line-height: 1.6; }
        .modal-skill-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .modal-skill-chip { padding: 4px 12px; border: 1px solid var(--success); color: var(--success); font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; }
        .modal-apply-btn {
          display: block; width: 100%; text-align: center; background: var(--primary); color: #000;
          padding: 16px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase;
          letter-spacing: 3px; text-decoration: none; border: 1px solid var(--primary);
          margin-top: 40px; cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .modal-apply-btn:hover { background: transparent; color: var(--primary); }

        @media (max-width: 768px) {
          .detail-card {
            padding: 24px 16px;
          }
          .modal-meta-row {
            flex-wrap: wrap;
            gap: 16px;
          }
        }
      `}</style>

      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Build Your Portfolio</div>
        <h1 className="section-title">Project Ideas</h1>
        <div className="section-sub">Real-world projects for {dna.dreamRole}</div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--spacing-section)' }}>
        {projects.map((p, i) => (
          <React.Fragment key={i}>
            {selectedProject?.title === p.title ? (
              <div ref={detailCardRef} className="detail-card stagger-item" style={{ animationDelay: `${i * 60}ms` }}>
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  CLOSE
                </button>

                <div className="modal-top">
                  <span className="modal-type-badge" style={{ borderColor: getDiffColor(p.difficulty), color: getDiffColor(p.difficulty) }}>
                    {p.difficulty}
                  </span>
                  <h2 className="modal-job-title">{p.title}</h2>
                  <p className="modal-job-company">{dna.dreamRole}</p>
                </div>

                <div className="modal-meta-row">
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">Time Estimate</span>
                    <span className="modal-meta-value">{p.hours} HRS</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">Tech Stack</span>
                    <span className="modal-meta-value">{p.skills.join(', ')}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">Difficulty</span>
                    <span className="modal-meta-value">{p.difficulty}</span>
                  </div>
                </div>

                <div className="modal-section">
                  <p className="modal-section-label">About this project</p>
                  <p className="modal-desc">{getExtendedDetails(p).overview}</p>
                </div>

                <div className="modal-section">
                  <p className="modal-section-label">What you'll build</p>
                  <ul className="modal-desc" style={{ paddingLeft: 20, margin: 0 }}>
                    {getExtendedDetails(p).features.map((f, idx) => (
                      <li key={idx} style={{ marginBottom: 8 }}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <p className="modal-section-label">Your matching skills</p>
                  <div className="modal-skill-row">
                    {p.skills.map(skill => {
                      const hasSkill = userSkills.includes(skill);
                      return (
                        <span 
                          key={skill} 
                          className="modal-skill-chip"
                          style={{
                            borderColor: hasSkill ? 'var(--success)' : 'var(--warning)',
                            color: hasSkill ? 'var(--success)' : 'var(--warning)'
                          }}
                        >
                          {skill}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <button
                  className="modal-apply-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  START PROJECT
                </button>
              </div>
            ) : (
              <div className="card project-card-clickable" onClick={() => setSelectedProject(p)} style={{ display: 'flex', flexDirection: 'column', padding: 40, borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0 }}>
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
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '2px' }}>TIME</span>
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
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
