import React, { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { DNAProvider, useDNA } from './context/DNAContext'
import Sidebar from './components/Sidebar'
import Onboarding from './components/Onboarding'
import CelebrationOverlay from './components/CelebrationOverlay'
import XPToast from './components/XPToast'
import Dashboard from './pages/Dashboard'
import SkillGap from './pages/SkillGap'
import Roadmap from './pages/Roadmap'
import Missions from './pages/Missions'
import Resources from './pages/Resources'
import Projects from './pages/Projects'
import GitHubStats from './pages/GitHubStats'
import Jobs from './pages/Jobs'
import Interview from './pages/Interview'
import Resume from './pages/Resume'
import FocusTimer from './pages/FocusTimer'
import Profile from './pages/Profile'

import VideoBackground from './components/VideoBackground'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '48px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          fontSize: 12,
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          <div style={{ color: 'var(--warning)', marginBottom: 16 }}>
            SYSTEM ERROR
          </div>
          <div style={{ marginBottom: 24 }}>
            This module encountered an error.
          </div>
          <button
            className="btn-ghost"
            onClick={() => this.setState({ hasError: false })}
          >
            RETRY
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function AppInner() {
  const { dna } = useDNA()
  const [menuOpen, setMenuOpen] = React.useState(false)

  useEffect(() => {
    if (window.innerWidth > 768) setMenuOpen(true)
  }, [])
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0)
    }
  }, [location.pathname])

  if (!dna) return (
    <>
      <VideoBackground />
      <Onboarding />
    </>
  )
  return (
    <div className={`app-shell ${menuOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <VideoBackground />
      <Sidebar isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
      <main className="main-content" ref={mainRef}>
        <Routes>
          <Route path="/" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
          <Route path="/skill-gap" element={<ErrorBoundary><SkillGap /></ErrorBoundary>} />
          <Route path="/roadmap" element={<ErrorBoundary><Roadmap /></ErrorBoundary>} />
          <Route path="/missions" element={<ErrorBoundary><Missions /></ErrorBoundary>} />
          <Route path="/resources" element={<ErrorBoundary><Resources /></ErrorBoundary>} />
          <Route path="/projects" element={<ErrorBoundary><Projects /></ErrorBoundary>} />
          <Route path="/github" element={<ErrorBoundary><GitHubStats /></ErrorBoundary>} />
          <Route path="/jobs" element={<ErrorBoundary><Jobs /></ErrorBoundary>} />
          <Route path="/interview" element={<ErrorBoundary><Interview /></ErrorBoundary>} />
          <Route path="/resume" element={<ErrorBoundary><Resume /></ErrorBoundary>} />
          <Route path="/focus" element={<ErrorBoundary><FocusTimer /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <CelebrationOverlay />
      <XPToast />
    </div>
  )
}

export default function App() {
  return (
    <DNAProvider>
      <AppInner />
    </DNAProvider>
  )
}
