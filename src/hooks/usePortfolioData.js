import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase, supabaseReady } from '../lib/supabase'

const RETRY_BASE_DELAY = 1500 // ms
const RETRY_MAX_DELAY = 10000 // ms

function normalizeConfig(raw) {
  if (!raw) return null
  return {
    ...raw,
    taglines: raw.taglines || (raw.tagline ? raw.tagline.split(',').map(t => t.trim()).filter(Boolean) : []),
  }
}

export function usePortfolioData() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const retryCount = useRef(0)
  const retryTimer = useRef(null)

  const fetchData = useCallback(async () => {
    setLoading(true)

    if (!supabaseReady) {
      // Supabase not configured — keep retrying in case env vars load late
      const delay = Math.min(RETRY_BASE_DELAY * Math.pow(2, retryCount.current), RETRY_MAX_DELAY)
      retryCount.current += 1
      retryTimer.current = setTimeout(() => fetchData(), delay)
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

      // Success — reset retry counter and stop loading
      retryCount.current = 0
      setProjects(projectsResult.data)
      setSkills(skillsResult.data)
      setExperience(expResult.data)
      setConfig(normalizeConfig(configResult.data))
      setLoading(false)
    } catch {
      // Supabase slow or errored — retry with exponential backoff (capped)
      const delay = Math.min(RETRY_BASE_DELAY * Math.pow(2, retryCount.current), RETRY_MAX_DELAY)
      retryCount.current += 1
      retryTimer.current = setTimeout(() => fetchData(), delay)
    }
  }, [])

  useEffect(() => {
    fetchData()
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current)
    }
  }, [fetchData])

  return { projects, skills, experience, config, loading, refresh: fetchData }
}


