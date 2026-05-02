import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import { ALL_SKILLS } from '../data/roleSkills'
import HeroVideo from '../components/HeroVideo'

export default function Profile() {
  const { dna, setDna, levelInfo, resetDNA } = useDNA()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ ...dna })
  const [githubHeatmap, setGithubHeatmap] = useState(null)

 
  const [history] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studentos_focus_history') || '{}') } catch { return {} }
  })

  
  const heatmapData = []
  const today = new Date()
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toLocaleDateString()
    heatmapData.push({
      date: d,
      count: history[dateStr] || 0
    })
  }

  useEffect(() => {
    if (!dna.githubUsername) return
    const fetchGithubActivity = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${dna.githubUsername}/repos?per_page=100&sort=updated`)
        if (!res.ok) return
        const repos = await res.json()
        
        const dateCounts = {}
        repos.forEach(r => {
          if (r.pushed_at) {
            const date = r.pushed_at.split('T')[0]
            dateCounts[date] = (dateCounts[date] || 0) + 1
          }
        })
        
        const squares = []
        for (let i = 83; i >= 0; i--) {
          const d = new Date(today)
          d.setDate(today.getDate() - i)
          const dateStr = d.toISOString().split('T')[0]
          const count = dateCounts[dateStr] || 0
          
          let color = 'rgba(255,255,255,0.04)'
          if (count === 1) color = 'rgba(232,213,183,0.3)'
          if (count === 2) color = 'rgba(232,213,183,0.6)'
          if (count >= 3) color = 'rgba(232,213,183,0.95)'
          
          squares.push({ date: dateStr, count, color })
        }
        setGithubHeatmap(squares)
      } catch (e) {
       
      }
    }
    fetchGithubActivity()
  }, [dna.githubUsername])

  function handleSave() {
    setDna(editData)
    setIsEditing(false)
  }

  function toggleSkill(s) {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.includes(s) 
        ? prev.skills.filter(x => x !== s) 
        : [...prev.skills, s]
    }))
  }

  if (isEditing) {
    return (
      <div className="page-enter">
        <div className="section-label">Settings</div>
        <h1 className="section-title">Edit Profile</h1>
        <p className="section-sub">Update your Career DNA.</p>

        <div className="card" style={{ maxWidth: 600 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Field of Study</label>
            <input 
              className="input-field" 
              value={editData.degree} 
              onChange={e => setEditData({...editData, degree: e.target.value})} 
            />
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Dream Role</label>
            <select 
              className="input-field" 
              value={editData.dreamRole}
              onChange={e => setEditData({...editData, dreamRole: e.target.value})}
              style={{ appearance: 'none', background: 'var(--elevated)' }}
            >
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Product Manager">Product Manager</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Current Skills</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ALL_SKILLS.map(s => {
                const isSelected = editData.skills.includes(s)
                return (
                  <button 
                    key={s} 
                    onClick={() => toggleSkill(s)}
                    className={`chip chip-${isSelected ? 'success' : 'ghost'}`}
                    style={{ 
                      background: isSelected ? 'rgba(74,222,128,0.1)' : 'var(--elevated)',
                      borderColor: isSelected ? 'var(--success)' : 'var(--border-default)',
                      color: isSelected ? 'var(--success)' : 'var(--text-muted)'
                    }}
                  >
                    {s} {isSelected && '✓'}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <button className="btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">DNA IDENTITY</div>
        <h1 className="section-title">User Profile</h1>
        <div className="section-sub">
          Core biographical data and technical DNA sequence. 
          Managed via StudentOS X Performance Engine.
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--s-12)' }}>
        <div>
          <div className="card-elevated" style={{ marginBottom: 'var(--s-8)', borderTop: '4px solid var(--primary)' }}>
            <div className="section-label">SYSTEM IDENTIFIER</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 48, color: 'var(--on-dark)', marginBottom: 8, letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 300 }}>
              {dna.dreamRole}
            </div>
            <div style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 'var(--s-8)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>{dna.degree}</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-6)', marginBottom: 'var(--s-8)' }}>
              <div>
                <div className="section-label" style={{ marginBottom: 8 }}>OPERATING LEVEL</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'var(--on-dark)' }}>{dna.level}</div>
                <div style={{ fontSize: 10, color: 'var(--primary)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', marginTop: 4 }}>{levelInfo?.title.toUpperCase()}</div>
              </div>
              <div>
                <div className="section-label" style={{ marginBottom: 8 }}>CUMULATIVE XP</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'var(--on-dark)' }}>{dna.xp}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', marginTop: 4 }}>UNIT POINTS</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 'var(--s-6)' }}>
              <div className="section-label" style={{ marginBottom: 'var(--s-4)' }}>ACQUIRED COMPETENCIES</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {dna.skills.map(s => <span key={s} className="chip selected" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>)}
              </div>
            </div>
          </div>
          
          <button className="btn-secondary" onClick={() => setIsEditing(true)}>EDIT PROFILE</button>
          
          <div style={{ marginTop: 40, borderTop: '1px solid var(--hairline)', paddingTop: 24 }}>
            <button 
              className="btn-ghost" 
              style={{ color: 'var(--warning)', padding: 0, textAlign: 'left' }}
              onClick={() => {
                if (window.confirm('Are you sure you want to reset your OS? This will delete all progress.')) {
                  resetDNA()
                }
              }}
            >
              RESET OPERATING SYSTEM
            </button>
          </div>
        </div>

        <div>
          <div className="card" style={{ borderLeft: '1px solid var(--hairline-strong)' }}>
            <div className="section-label">Activity</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, letterSpacing: '2px', color: 'var(--on-dark)', marginBottom: 40, textTransform: 'uppercase' }}>
              {githubHeatmap ? 'GITHUB PUSH ACTIVITY — LAST 12 WEEKS' : 'CONSISTENCY HEATMAP'}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {Array.from({ length: 7 }).map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: 'contents' }}>
                  {githubHeatmap ? (
                    githubHeatmap.slice(rowIndex * 12, (rowIndex + 1) * 12).map((sq, colIndex) => (
                      <div 
                        key={colIndex} 
                        title={`${sq.count} pushes on ${sq.date}`}
                        style={{ 
                          width: '100%', 
                          paddingBottom: '100%', 
                          background: sq.color, 
                          borderRadius: 0,
                          border: '1px solid var(--surface-card)'
                        }} 
                      />
                    ))
                  ) : (
                    heatmapData.slice(rowIndex * 12, (rowIndex + 1) * 12).map((day, colIndex) => {
                      let bg = 'var(--surface-elevated)'
                      if (day.count > 0) bg = 'rgba(255,255,255,0.3)'
                      if (day.count > 2) bg = 'rgba(255,255,255,0.6)'
                      if (day.count > 4) bg = 'var(--primary)'
                      
                      return (
                        <div 
                          key={colIndex} 
                          title={`${day.count} sessions on ${day.date.toLocaleDateString()}`}
                          style={{ 
                            width: '100%', 
                            paddingBottom: '100%',
                            background: bg, 
                            borderRadius: 0,
                            border: '1px solid var(--surface-card)'
                          }} 
                        />
                      )
                    })
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px', color: 'var(--text-muted)' }}>
              LESS <div style={{ width: 10, height: 10, background: 'var(--surface-elevated)' }}/>
              <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.3)' }}/>
              <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.6)' }}/>
              <div style={{ width: 10, height: 10, background: 'var(--primary)' }}/> MORE
            </div>
            
            <div style={{ marginTop: 40, borderTop: '1px solid var(--hairline-strong)', paddingTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>MEMBER SINCE</span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--on-dark)' }}>{new Date(dna.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>MISSIONS COMPLETED</span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--on-dark)' }}>{(dna.completedMissions || []).length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>FOCUS SESSIONS</span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--on-dark)' }}>{dna.focusSessions || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
