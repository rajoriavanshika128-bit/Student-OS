import React, { useState, useEffect } from 'react'
import AnimatedCounter from '../components/AnimatedCounter'
import { useDNA } from '../context/DNAContext'
import HeroVideo from '../components/HeroVideo'

export default function GitHubStats() {
  const { dna, addXP } = useDNA()
  const [username, setUsername] = useState(dna?.githubUsername || '')
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [connectedOnce, setConnectedOnce] = useState(!!dna?.githubUsername)

  const fetchGitHub = async (uname) => {
    setLoading(true)
    setError(null)
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${uname}`),
        fetch(`https://api.github.com/users/${uname}/repos?per_page=100&sort=updated`)
      ])
      if (!userRes.ok) throw new Error('User not found. Check the username and try again.')
      
      const user = await userRes.json()
      const repoList = await reposRes.json()
      
      setUserData(user)
      setRepos(repoList)
      
      if (!connectedOnce) {
        addXP(15, 'GitHub Connected')
        setConnectedOnce(true)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dna?.githubUsername) {
      fetchGitHub(dna.githubUsername)
    }
  }, [dna?.githubUsername])

  function handleLoadStats(e) {
    e.preventDefault()
    if (username.trim()) {
      fetchGitHub(username.trim())
    }
  }


  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  
  const languages = repos.map(r => r.language).filter(Boolean)
  const languageCounts = languages.reduce((acc, lang) => {
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {})
  
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)
  
  const daysSinceLastPush = repos.length > 0 && repos[0].pushed_at
    ? Math.floor((Date.now() - new Date(repos[0].pushed_at)) / (1000 * 60 * 60 * 24))
    : null

  const codeActivityScore = userData ? Math.min(100, Math.round(
    (userData.public_repos * 3) + (totalStars * 2) + (totalForks * 1.5) +
    (daysSinceLastPush !== null && daysSinceLastPush < 7 ? 15 : 0)
  )) : 0

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Developer Identity</div>
        <h1 className="section-title">GitHub Stats</h1>
        <div className="section-sub">Open Source Impact</div>
      </div>

      {!dna?.githubUsername && !userData && !loading && (
        <div className="card" style={{ marginBottom: 'var(--spacing-section)', padding: 40, textAlign: 'center' }}>
          <form onSubmit={handleLoadStats} style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="ENTER GITHUB USERNAME" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ maxWidth: 400, textAlign: 'center', fontSize: 24, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}
            />
            <button type="submit" className="btn-primary" disabled={!username.trim()}>
              LOAD STATS
            </button>
          </form>
          {error && <div style={{ color: 'var(--warning)', fontSize: 13, marginTop: 16 }}>{error}</div>}
        </div>
      )}

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="skeleton" style={{ height: 120 }} />
          <div className="grid-4"><div className="skeleton" style={{ height: 100 }} /><div className="skeleton" style={{ height: 100 }} /><div className="skeleton" style={{ height: 100 }} /><div className="skeleton" style={{ height: 100 }} /></div>
          <div className="skeleton" style={{ height: 60 }} />
          <div className="grid-2"><div className="skeleton" style={{ height: 120 }} /><div className="skeleton" style={{ height: 120 }} /></div>
        </div>
      )}

      {error && !loading && userData && (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ color: 'var(--warning)', marginBottom: 24, fontFamily: 'var(--font-mono)' }}>ERROR: {error}</div>
          <button className="btn-secondary" onClick={() => fetchGitHub(username)}>TRY AGAIN</button>
        </div>
      )}

      {!loading && !error && userData && (
        <div className="page-enter">
          
          <div className="card-elevated" style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 'var(--spacing-section)' }}>
            <div style={{ width: 120, height: 120, border: '1px solid var(--hairline-strong)', overflow: 'hidden', flexShrink: 0 }}>
              <img src={userData.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
              <div style={{ display: 'none', width: '100%', height: '100%', background: 'var(--surface-soft)', alignItems: 'center', justifyContent: 'center', color: 'var(--on-dark)', fontSize: 40, fontFamily: 'var(--font-heading)' }}>
                {(userData.name || userData.login).charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 32, fontFamily: 'var(--font-heading)', color: 'var(--on-dark)', letterSpacing: '2px' }}>{userData.name || userData.login}</div>
              {userData.bio && <div style={{ fontSize: 16, color: 'var(--text-muted)', marginTop: 8, fontFamily: 'var(--font-body)' }}>{userData.bio}</div>}
              {userData.location && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '2px' }}>LOC: {userData.location}</div>}
              
              <div style={{ display: 'flex', gap: 24, marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '2px' }}>
                <span><strong style={{ color: 'var(--on-dark)' }}>{userData.followers}</strong> FLW</span>
                <span><strong style={{ color: 'var(--on-dark)' }}>{userData.following}</strong> FLG</span>
                <span><strong style={{ color: 'var(--on-dark)' }}>{userData.public_repos}</strong> REP</span>
              </div>
            </div>
          </div>

         
          <div className="grid-4" style={{ marginBottom: 'var(--spacing-section)' }}>
            <div className="stat-card">
              <div className="stat-card-label">Total Stars</div>
              <div className="stat-card-value"><AnimatedCounter value={totalStars} /></div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Top Language</div>
              <div className="stat-card-value">{topLanguages.length ? topLanguages[0][0] : 'NONE'}</div>
            </div>
            <div className="stat-card" style={{ borderLeftColor: 'var(--primary)' }}>
              <div className="stat-card-label">Activity Score</div>
              <div className="stat-card-value"><AnimatedCounter value={codeActivityScore} /></div>
              <div className="stat-card-sub">out of 100</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Total Forks</div>
              <div className="stat-card-value"><AnimatedCounter value={totalForks} /></div>
            </div>
          </div>

      
          {topLanguages.length > 0 && (
            <div className="card" style={{ marginBottom: 'var(--spacing-section)' }}>
              <div className="section-label" style={{ marginBottom: 24 }}>Language Breakdown</div>
              <div style={{ display: 'flex', gap: 2, height: 4, overflow: 'hidden', marginBottom: 24, background: 'var(--hairline)' }}>
                {topLanguages.map(([lang, count], i) => (
                  <div key={lang} className="progress-bar-fill" style={{ 
                    width: `${(count / languages.length) * 100}%`, 
                    background: i === 0 ? 'var(--primary)' : 'var(--text-muted-soft)',
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                {topLanguages.map(([lang, count], i) => (
                  <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px' }}>
                    <div style={{ width: 6, height: 6, background: i === 0 ? 'var(--primary)' : 'var(--text-muted-soft)' }} />
                    <span style={{ color: 'var(--on-dark)', textTransform: 'uppercase' }}>{lang}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{Math.round((count / languages.length) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          <div className="section-label" style={{ marginBottom: 32 }}>Top Repositories</div>
          {repos.length === 0 ? (
            <div className="card" style={{ color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>NO PUBLIC REPOSITORIES YET.</div>
          ) : (
            <div className="grid-2">
              {topRepos.map((r, i) => (
                <div key={r.id} className="card-elevated page-enter" style={{ display: 'flex', flexDirection: 'column', animationDelay: `${i * 60}ms`, padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <a href={r.html_url} target="_blank" rel="noreferrer" style={{ fontSize: 24, fontFamily: 'var(--font-heading)', color: 'var(--on-dark)', textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      {r.name}
                    </a>
                    {r.language && <span className="badge">{r.language}</span>}
                  </div>
                  <div style={{ fontSize: 16, color: 'var(--text)', marginBottom: 32, flex: 1, fontFamily: 'var(--font-body)' }}>
                    {r.description ? (r.description.length > 80 ? r.description.slice(0, 80) + '...' : r.description) : <span style={{ opacity: 0.5 }}>No description provided</span>}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--hairline)', paddingTop: 16, marginTop: 'auto' }}>
                    <div style={{ display: 'flex', gap: 24, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '2px' }}>
                      <span><span style={{ color: 'var(--text-muted)' }}>★</span> {r.stargazers_count}</span>
                      <span>⑂ {r.forks_count}</span>
                    </div>
                    <a href={r.html_url} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: 0 }}>
                      VIEW →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
