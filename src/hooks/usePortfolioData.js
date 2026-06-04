import { useEffect, useState } from 'react'
import { supabase, supabaseReady } from '../lib/supabase'
import {
  fallbackConfig,
  fallbackSkills,
  fallbackProjects,
  fallbackExperience,
} from '../lib/fallbackData'

function normalizeConfig(raw) {
  if (!raw) return null
  return {
    ...raw,
    taglines: raw.taglines || (raw.tagline ? [raw.tagline, 'AI Enthusiast', 'Open Source Builder'] : fallbackConfig.taglines),
  }
}

export function usePortfolioData() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchData() {
    setLoading(true)
    setError(null)

    if (!supabaseReady) {
      setProjects(fallbackProjects)
      setSkills(fallbackSkills)
      setExperience(fallbackExperience)
      setConfig(fallbackConfig)
      setLoading(false)
      return
    }

    try {
      const [projectsResult, skillsResult, expResult, configResult] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('order_index'),
        supabase.from('experience').select('*').order('order_index'),
        supabase.from('site_config').select('*').single(),
      ])

      for (const result of [projectsResult, skillsResult, expResult, configResult]) {
        if (result.error) throw result.error
      }

      setProjects(projectsResult.data)
      setSkills(skillsResult.data)
      setExperience(expResult.data)
      setConfig(normalizeConfig(configResult.data))
    } catch (err) {
      setError(err.message)
      setProjects(fallbackProjects)
      setSkills(fallbackSkills)
      setExperience(fallbackExperience)
      setConfig(fallbackConfig)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { projects, skills, experience, config, loading, error, refresh: fetchData }
}
