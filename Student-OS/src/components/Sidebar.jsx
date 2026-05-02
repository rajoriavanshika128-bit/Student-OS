import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDNA } from '../context/DNAContext'
import './Sidebar.css' 

export default function Sidebar({ isOpen, toggle }) {
  const { dna } = useDNA()

  if (!dna) return null

  return (
    <>
      
      <button 
        className={`nav-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={toggle}
      >
        <div className="nav-toggle-line" />
        <div className="nav-toggle-line" />
      </button>

      <aside className={`bugatti-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="wordmark-display" onClick={() => toggle()}>
            STUDENTOS <span style={{ opacity: 0.4 }}>X</span>
          </NavLink>
        </div>

        <div className="sidebar-scrollable">
          <div className="nav-group">
            <div className="nav-group-label">IDENTITY</div>
            <NavLink to="/profile" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Profile</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/github" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">GitHub Sync</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-label">ENGINE</div>
            <NavLink to="/" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Dashboard</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/skill-gap" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Skill Gap</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/roadmap" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Roadmap</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-label">CAREER</div>
            <NavLink to="/jobs" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Market</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/interview" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Interview</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/resume" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Optimizer</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-label">UTILITIES</div>
            <NavLink to="/missions" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Missions</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/projects" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Projects</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/focus" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Focus Timer</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/resources" className="nav-link" onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Resources</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>
        </div>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, background: 'var(--primary)' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px', color: 'var(--text-muted)' }}>
              LV.{dna.level} {dna.dreamRole.toUpperCase()}
            </div>
          </div>
        </div>
      </aside>
      
      
      {isOpen && <div className="sidebar-mobile-overlay" onClick={toggle} />}
    </>
  )
}
