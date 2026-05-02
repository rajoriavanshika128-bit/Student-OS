import React, { useState } from 'react'
import { useDNA } from '../context/DNAContext'
import { ROLE_SKILLS } from '../data/roleSkills'

export default function Resume() {
  const { dna, addXP } = useDNA()
  const [resumeText, setResumeText] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [results, setResults] = useState(null)

  const requiredSkills = ROLE_SKILLS[dna.dreamRole] || []

  function handleAnalyze() {
    if (!resumeText.trim()) return
    
    const text = resumeText.toLowerCase()
    const found = []
    const missing = []
    
    requiredSkills.forEach(skill => {
      
      const regex = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'i')
      if (text.includes(skill.toLowerCase()) || regex.test(text)) {
        found.push(skill)
      } else {
        missing.push(skill)
      }
    })
    
    const score = requiredSkills.length > 0 
      ? Math.round((found.length / requiredSkills.length) * 100)
      : 0
      
    setResults({ found, missing, score })
    setAnalyzed(true)
    addXP(10, 'Resume Analyzed')
  }

  function getScoreColor(score) {
    if (score >= 80) return 'var(--success)'
    if (score >= 50) return 'var(--amber)'
    return 'var(--danger)'
  }

  return (
    <div className="page-enter">
      <div 
        className="hero-photo-band" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=2000&q=80')` }}
      >
        <div className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Optimization</div>
        <h1 className="section-title" style={{ fontSize: 64 }}>RESUME ANALYZER</h1>
        <div className="section-label" style={{ marginTop: 24, letterSpacing: '4px', color: '#ffffff' }}>Check ATS matches for {dna.dreamRole}</div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--spacing-section)' }}>
        <div className="card" style={{ borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0, padding: 40 }}>
          <div className="section-label" style={{ marginBottom: 24 }}>Paste Resume Text</div>
          <textarea 
            className="input-field" 
            placeholder="PASTE THE TEXT CONTENT OF YOUR RESUME HERE..."
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            style={{ minHeight: 400, marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6 }}
          />
          <button 
            className="btn-primary" 
            onClick={handleAnalyze}
            disabled={resumeText.trim().length < 50}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            ANALYZE RESUME
          </button>
          {resumeText.trim().length > 0 && resumeText.trim().length < 50 && (
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--warning)', marginTop: 16, textAlign: 'center', textTransform: 'uppercase' }}>
              PLEASE PASTE MORE TEXT FOR A MEANINGFUL ANALYSIS.
            </div>
          )}
        </div>

        {analyzed && results ? (
          <div className="card page-enter" style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0, padding: 40 }}>
            <div className="section-label">Analysis Results</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 40, marginTop: 16 }}>
              <div style={{ 
                width: 120, height: 120, borderRadius: 0, 
                border: `2px solid ${getScoreColor(results.score)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                background: 'transparent'
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 48, color: getScoreColor(results.score) }}>
                  {results.score}%
                </span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--on-dark)', marginBottom: 8 }}>ATS MATCH SCORE</div>
                <div style={{ fontSize: 14, fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {results.score >= 80 ? 'Excellent match. Your resume is well-tailored.' 
                    : results.score >= 50 ? 'Good start, but missing some key terms.' 
                    : 'Significant gaps detected. Major revision needed.'}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--success)', marginBottom: 16 }}>KEYWORDS FOUND ✓</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {results.found.length > 0 ? results.found.map(s => (
                  <span key={s} className="chip" style={{ border: '1px solid var(--success)', color: 'var(--success)', background: 'transparent', borderRadius: 0, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase' }}>{s}</span>
                )) : <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>NONE OF THE CORE SKILLS FOUND.</span>}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: 16 }}>MISSING KEYWORDS ⚠</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {results.missing.length > 0 ? results.missing.map(s => (
                  <span key={s} className="chip" style={{ border: '1px solid var(--danger)', color: 'var(--danger)', background: 'transparent', borderRadius: 0, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase' }}>{s}</span>
                )) : <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>NO MISSING CORE SKILLS.</span>}
              </div>
              {results.missing.length > 0 && (
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', marginTop: 24, borderTop: '1px solid var(--hairline-strong)', paddingTop: 24, textTransform: 'uppercase', lineHeight: 1.6 }}>
                  CONSIDER ADDING PROJECTS OR EXPERIENCE DEMONSTRATING THE MISSING SKILLS.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)', borderLeft: '1px solid var(--hairline-strong)', borderRadius: 0, padding: 40 }}>
            <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.5 }}>📄</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: '2px', color: 'var(--on-dark)', textTransform: 'uppercase', marginBottom: 16 }}>AWAITING RESUME</div>
            <div style={{ fontSize: 14, fontFamily: 'var(--font-body)', maxWidth: 300, lineHeight: 1.6 }}>Paste your resume text and hit analyze to see your ATS match score.</div>
          </div>
        )}
      </div>
    </div>
  )
}
