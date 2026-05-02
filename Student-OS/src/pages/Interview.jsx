import React, { useState } from 'react'
import { useDNA } from '../context/DNAContext'
import { INTERVIEW_DATA } from '../data/interviewData'

export default function Interview() {
  const { dna, addXP } = useDNA()
  const questions = INTERVIEW_DATA[dna.dreamRole] || INTERVIEW_DATA['Frontend Developer']
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  function handleNext(confident) {
    if (confident) setScore(s => s + 1)
    setFlipped(false)
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1)
      } else {
        setFinished(true)
        addXP(50, 'Interview Practice Complete')
      }
    }, 150)
  }

  function handleRestart() {
    setCurrentIndex(0)
    setScore(0)
    setFinished(false)
    setFlipped(false)
  }

  if (finished) {
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎯</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, marginBottom: 16, letterSpacing: '4px', textTransform: 'uppercase' }}>Practice Complete</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 40, letterSpacing: '2px', textTransform: 'uppercase' }}>You marked {score} out of {questions.length} questions as confident.</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <button className="btn-secondary" onClick={handleRestart}>PRACTICE AGAIN</button>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]

  return (
    <div className="page-enter">
      <div 
        className="hero-photo-band" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=2000&q=80')` }}
      >
        <div className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Preparation</div>
        <h1 className="section-title" style={{ fontSize: 64 }}>INTERVIEW ARENA</h1>
        <div className="section-label" style={{ marginTop: 24, letterSpacing: '4px', color: '#ffffff' }}>Role-specific questions</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid var(--hairline-strong)', paddingBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          QUESTION {currentIndex + 1} OF {questions.length}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {score} CONFIDENT
        </div>
      </div>
      
      <div className="progress-bar-track" style={{ marginBottom: 'var(--spacing-section)', height: 2 }}>
        <div className="progress-bar-fill" style={{ width: `${((currentIndex) / questions.length) * 100}%`, background: 'var(--primary)' }} />
      </div>

      <div style={{ perspective: 1200, margin: '0 auto', maxWidth: 800 }}>
        <div 
          onClick={() => setFlipped(!flipped)}
          style={{ 
            position: 'relative', 
            width: '100%', 
            minHeight: 400, 
            transformStyle: 'preserve-3d', 
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: 'pointer'
          }}
        >
         
          <div className="card" style={{ 
            position: 'absolute', inset: 0, 
            backfaceVisibility: 'hidden', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: 60,
            borderRadius: 0, border: '1px solid var(--hairline-strong)', background: 'transparent'
          }}>
            <div className="section-label" style={{ marginBottom: 40, color: 'var(--text-muted)' }}>CLICK TO REVEAL ANSWER</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 400, lineHeight: 1.4, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--on-dark)' }}>{q.q}</h2>
          </div>
          
  
          <div className="card" style={{ 
            position: 'absolute', inset: 0, 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: 60,
            borderRadius: 0, border: '1px solid var(--primary)', background: 'var(--canvas)'
          }}>
            <div className="section-label" style={{ marginBottom: 40, color: 'var(--primary)' }}>ANSWER</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, color: 'var(--on-dark)', lineHeight: 1.6 }}>{q.a}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, opacity: flipped ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: flipped ? 'auto' : 'none', marginBottom: 'var(--spacing-section)' }}>
        <button className="btn-secondary" onClick={() => handleNext(false)} style={{ minWidth: 160, justifyContent: 'center' }}>
          NEED REVIEW
        </button>
        <button className="btn-primary" onClick={() => handleNext(true)} style={{ minWidth: 160, justifyContent: 'center' }}>
          GOT IT
        </button>
      </div>
    </div>
  )
}
