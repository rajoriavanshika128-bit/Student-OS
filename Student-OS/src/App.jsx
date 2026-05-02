import React, { useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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

function AppInner() {
  const { dna } = useDNA()
  const [menuOpen, setMenuOpen] = React.useState(true) // Default open for desktop

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
      <main className="main-content">
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/roadmap"   element={<Roadmap />} />
          <Route path="/missions"  element={<Missions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/projects"  element={<Projects />} />
          <Route path="/github"    element={<GitHubStats />} />
          <Route path="/jobs"      element={<Jobs />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/resume"    element={<Resume />} />
          <Route path="/focus"     element={<FocusTimer />} />
          <Route path="/profile"   element={<Profile />} />
          <Route path="*"          element={<Navigate to="/" />} />
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
