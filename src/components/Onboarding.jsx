import React, { useState, useEffect, useRef } from 'react'
import { useDNA } from '../context/DNAContext'
import './Onboarding.css'

const SKILLS = ['HTML','CSS','JavaScript','React','Python','Java','Git','SQL','Figma','Node.js','APIs','TypeScript']

const ROLES = [
  { id: 'Frontend Developer',   icon: '⬡', desc: 'Build beautiful UIs' },
  { id: 'Backend Developer',    icon: '◉', desc: 'Power server-side systems' },
  { id: 'Full Stack Developer', icon: '◈', desc: 'Own the full product' },
  { id: 'UI/UX Designer',       icon: '◫', desc: 'Craft user experiences' },
  { id: 'Data Analyst',         icon: '◎', desc: 'Turn data into decisions' },
  { id: 'Product Manager',      icon: '◷', desc: 'Drive product vision' },
  { id: 'DevOps Engineer',      icon: '⟶', desc: 'Automate & scale systems' },
]

function useTypewriter(text, speed = 38) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return { displayed, done }
}

export default function Onboarding() {
  const { setDna } = useDNA()
  const [step, setStep] = useState(0)
  const [degree, setDegree] = useState('')
  const [skills, setSkills] = useState([])
  const [dreamRole, setDreamRole] = useState('')
  const [entering, setEntering] = useState(false)

  const [githubUsername, setGithubUsername] = useState('')
  const [githubLoading, setGithubLoading] = useState(false)
  const [githubError, setGithubError] = useState(null)
  const [githubSuccess, setGithubSuccess] = useState(null)

  const questions = [
    'What are you studying?',
    'What skills do you have?',
    "What's your dream role?",
    'Connect your GitHub (optional)'
  ]
  const { displayed } = useTypewriter(questions[step])

  function toggleSkill(s) {
    setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  function canAdvance() {
    if (step === 0) return degree.trim().length > 0
    if (step === 1) return skills.length > 0
    if (step === 2) return dreamRole !== ''
    if (step === 3) return true 
    return false
  }

  async function handleConnectGitHub() {
    if (!githubUsername.trim()) return
    setGithubLoading(true)
    setGithubError(null)
    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername.trim()}`)
      if (!res.ok) throw new Error('Username not found. Try again.')
      const data = await res.json()
      setGithubSuccess(data)
    } catch (e) {
      setGithubError(e.message)
    } finally {
      setGithubLoading(false)
    }
  }

  function handleNext() {
    if (step < 3) { setStep(s => s + 1) }
    else { handleFinish() }
  }

  function handleFinish() {
    const dna = {
      degree, skills, dreamRole,
      xp: 0, level: 1, streak: 0,
      completedSkills: [],
      completedMissions: [],
      focusSessions: 0,
      createdAt: new Date().toISOString(),
      githubUsername: githubSuccess ? githubUsername.trim() : null
    }
    setDna(dna)
  }

  return (
    <div className="onboarding-shell">
      <div className="onboarding-progress-bar">
        <div className="onboarding-progress-fill" style={{ width: `${((step) / 3) * 100}%` }} />
      </div>

      <div className="onboarding-step-counter">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
          {String(step + 1).padStart(2, '0')} / 04
        </span>
      </div>

      <div className="onboarding-center">
        <div className="onboarding-card page-enter">
          <div className="onboarding-label">Career DNA Setup</div>
          <h1 className="onboarding-question">
            {displayed}<span className="onboarding-cursor">|</span>
          </h1>

          {step === 0 && (
            <div className="onboarding-input-wrap">
              <input
                className="input-field onboarding-input"
                placeholder="e.g. Computer Science, Design, Business..."
                value={degree}
                onChange={e => setDegree(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && canAdvance() && handleNext()}
                autoFocus
              />
            </div>
          )}

          {step === 1 && (
            <div className="onboarding-skills-grid">
              {SKILLS.map(s => (
                <button
                  key={s}
                  className={`skill-chip${skills.includes(s) ? ' selected' : ''}`}
                  onClick={() => toggleSkill(s)}
                >
                  {s}
                  {skills.includes(s) && <span className="skill-chip-check">✓</span>}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-roles-grid">
              {ROLES.map(r => (
                <button
                  key={r.id}
                  className={`role-card${dreamRole === r.id ? ' selected' : ''}`}
                  onClick={() => setDreamRole(r.id)}
                >
                  <span className="role-icon">{r.icon}</span>
                  <span className="role-name">{r.id}</span>
                  <span className="role-desc">{r.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="page-enter">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: 40, textTransform: 'uppercase' }}>We'll use your public repositories to power your stats.</div>
              
              {githubSuccess ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40, border: '1px solid var(--hairline-strong)', padding: 24 }}>
                  <img src={githubSuccess.avatar_url} alt="Avatar" style={{ width: 64, height: 64, borderRadius: 0, border: '1px solid var(--hairline-strong)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--on-dark)', letterSpacing: '2px', textTransform: 'uppercase' }}>{githubSuccess.name || githubSuccess.login}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px', color: 'var(--primary)', marginTop: 8 }}>✓ GITHUB CONNECTED</div>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: 40 }}>
                  <input 
                    className="input-field" 
                    placeholder="ENTER GITHUB USERNAME" 
                    value={githubUsername}
                    onChange={e => setGithubUsername(e.target.value)}
                    style={{ marginBottom: 16, fontSize: 24, fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}
                    autoFocus
                  />
                  {githubError && <div style={{ color: 'var(--warning)', fontSize: 13, marginBottom: 16, fontFamily: 'var(--font-mono)' }}>{githubError}</div>}
                  <button className="btn-primary" onClick={handleConnectGitHub} disabled={githubLoading || !githubUsername.trim()}>
                    {githubLoading ? 'CONNECTING...' : 'CONNECT GITHUB'}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="onboarding-actions">
            {step > 0 && (
              <button className="btn-ghost" onClick={() => setStep(s => s - 1)}>← BACK</button>
            )}
            
            {step === 3 && !githubSuccess ? (
               <button className="btn-ghost" onClick={handleFinish}>SKIP FOR NOW</button>
            ) : (
              <button
                className="btn-primary onboarding-cta"
                disabled={!canAdvance()}
                onClick={handleNext}
              >
                {step === 3 ? 'LAUNCH MY OS →' : 'CONTINUE →'}
              </button>
            )}
          </div>
        </div>

        <div className="onboarding-dots">
          {[0,1,2,3].map(i => (
            <div key={i} className={`onboarding-dot${step === i ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
