import { useCallback, useEffect, useState } from 'react'
import { supabase, supabaseReady } from '../lib/supabase'

export function useCRUD(tableName) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (message, type = 'error') => {
    setToastMessage({ message, type })
    setTimeout(() => setToastMessage(null), 4000)
  }

  const refresh = useCallback(async () => {
    if (!supabaseReady) { setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase.from(tableName).select('*')
    if (!error) setItems(data || [])
    setLoading(false)
  }, [tableName])

  useEffect(() => {
    refresh()
  }, [refresh])

  const create = async (payload) => {
    if (!supabaseReady) { showToast('Supabase not configured'); return }
    const { data, error } = await supabase.from(tableName).insert(payload).select().single()
    if (error) { showToast(error.message); return }
    setItems((prev) => [...prev, data])
  }

  const update = async (id, payload) => {
    if (!supabaseReady) { showToast('Supabase not configured'); return }
    const previous = items.find((item) => item.id === id)
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)))
    const { data, error } = await supabase.from(tableName).update(payload).eq('id', id).select().single()
    if (error) {
      setItems((prev) => prev.map((item) => (item.id === id ? previous : item)))
      showToast(error.message)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? data : item)))
  }

  const remove = async (id) => {
    if (!supabaseReady) { showToast('Supabase not configured'); return }
    const previous = [...items]
    setItems((prev) => prev.filter((item) => item.id !== id))
    const { error } = await supabase.from(tableName).delete().eq('id', id)
    if (error) { setItems(previous); showToast(error.message) }
  }

  return { items, loading, create, update, remove, refresh, toastMessage }
}
