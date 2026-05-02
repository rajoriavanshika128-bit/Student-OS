import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DNAContext = createContext(null)

const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Explorer', min: 0, max: 199 },
  { level: 2, title: 'Builder', min: 200, max: 499 },
  { level: 3, title: 'Developer', min: 500, max: 899 },
  { level: 4, title: 'Engineer', min: 900, max: 1399 },
  { level: 5, title: 'Architect', min: 1400, max: Infinity },
]

function getLevelInfo(xp) {
  const tier = LEVEL_THRESHOLDS.find(t => xp >= t.min && xp <= t.max) || LEVEL_THRESHOLDS[4]
  const next = LEVEL_THRESHOLDS.find(t => t.level === tier.level + 1)
  const progress = next ? Math.round(((xp - tier.min) / (next.min - tier.min)) * 100) : 100
  return { ...tier, next, progress }
}

function loadDNA() {
  try {
    const raw = localStorage.getItem('studentos_dna')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveDNA(dna) {
  localStorage.setItem('studentos_dna', JSON.stringify(dna))
}

export function DNAProvider({ children }) {
  const [dna, setDnaState] = useState(() => loadDNA())
  const [celebrationSkill, setCelebrationSkill] = useState(null)
  const [xpGain, setXpGain] = useState(null)

  const setDna = useCallback((newDna) => {
    setDnaState(newDna)
    if (newDna) saveDNA(newDna)
  }, [])

  const addXP = useCallback((amount, label) => {
    setDnaState(prev => {
      if (!prev) return prev
      const newXP = (prev.xp || 0) + amount
      const levelInfo = getLevelInfo(newXP)
      const updated = { ...prev, xp: newXP, level: levelInfo.level }
      saveDNA(updated)
      return updated
    })
    setXpGain({ amount, label, id: Date.now() })
    setTimeout(() => setXpGain(null), 2500)
  }, [])

  const markSkillLearned = useCallback((skill) => {
    setDnaState(prev => {
      if (!prev) return prev
      const completedSkills = [...(prev.completedSkills || []), skill]
      const skills = [...(prev.skills || []), skill]
      const updated = { ...prev, completedSkills, skills }
      saveDNA(updated)
      return updated
    })
    setCelebrationSkill(skill)
    addXP(50, 'Skill Unlocked')
  }, [addXP])

  const clearCelebration = useCallback(() => setCelebrationSkill(null), [])

  const completeMission = useCallback((missionId) => {
    setDnaState(prev => {
      if (!prev) return prev
      const completedMissions = [...(prev.completedMissions || []), missionId]
      const updated = { ...prev, completedMissions }
      saveDNA(updated)
      return updated
    })
  }, [])

  const incrementStreak = useCallback(() => {
    setDnaState(prev => {
      if (!prev) return prev
      const streak = (prev.streak || 0) + 1
      const updated = { ...prev, streak }
      saveDNA(updated)
      return updated
    })
  }, [])

  const incrementFocusSessions = useCallback(() => {
    setDnaState(prev => {
      if (!prev) return prev
      const focusSessions = (prev.focusSessions || 0) + 1
      const updated = { ...prev, focusSessions }
      saveDNA(updated)
      return updated
    })
  }, [])

  const resetDNA = useCallback(() => {
    localStorage.removeItem('studentos_dna')
    setDnaState(null)
  }, [])

  const levelInfo = dna ? getLevelInfo(dna.xp || 0) : null

  return (
    <DNAContext.Provider value={{
      dna, setDna, addXP, markSkillLearned, clearCelebration,
      celebrationSkill, xpGain, completeMission, incrementStreak,
      incrementFocusSessions, resetDNA, levelInfo, LEVEL_THRESHOLDS, getLevelInfo,
    }}>
      {children}
    </DNAContext.Provider>
  )
}

export function useDNA() {
  const ctx = useContext(DNAContext)
  if (!ctx) throw new Error('useDNA must be used within DNAProvider')
  return ctx
}
