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
        className="mobile-hamburger-btn"
        onClick={toggle}
      >
        <div className="hamburger-line" />
        <div className="hamburger-line" />
        <div className="hamburger-line" />
      </button>

      <aside className={`bugatti-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={toggle}>
          <div className="hamburger-line" style={{ transform: 'translateY(1px) rotate(45deg)' }} />
          <div className="hamburger-line" style={{ transform: 'translateY(-0px) rotate(-45deg)' }} />
        </button>
        <div className="sidebar-header">
          <NavLink to="/" className="wordmark-display" onClick={() => toggle()}>
            STUDENTOS <span style={{ opacity: 0.4 }}>X</span>
          </NavLink>
        </div>

        <div className="sidebar-scrollable">
          <div className="nav-group">
            <div className="nav-group-label">IDENTITY</div>
            <NavLink to="/profile" className="nav-link sidebar-item-enter" style={{ animationDelay: '50ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Profile</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/github" className="nav-link sidebar-item-enter" style={{ animationDelay: '100ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">GitHub Sync</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-label">ENGINE</div>
            <NavLink to="/" className="nav-link sidebar-item-enter" style={{ animationDelay: '150ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Dashboard</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/skill-gap" className="nav-link sidebar-item-enter" style={{ animationDelay: '200ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Skill Gap</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/roadmap" className="nav-link sidebar-item-enter" style={{ animationDelay: '250ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Roadmap</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-label">CAREER</div>
            <NavLink to="/jobs" className="nav-link sidebar-item-enter" style={{ animationDelay: '300ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Market</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/interview" className="nav-link sidebar-item-enter" style={{ animationDelay: '350ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Interview</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/resume" className="nav-link sidebar-item-enter" style={{ animationDelay: '400ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Optimizer</span>
              <span className="nav-link-indicator" />
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-label">UTILITIES</div>
            <NavLink to="/missions" className="nav-link sidebar-item-enter" style={{ animationDelay: '450ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Missions</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/projects" className="nav-link sidebar-item-enter" style={{ animationDelay: '500ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Projects</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/focus" className="nav-link sidebar-item-enter" style={{ animationDelay: '550ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
              <span className="nav-link-text">Focus Timer</span>
              <span className="nav-link-indicator" />
            </NavLink>
            <NavLink to="/resources" className="nav-link sidebar-item-enter" style={{ animationDelay: '600ms' }} onClick={() => window.innerWidth < 1024 && toggle()}>
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
