import { useState, useEffect, useCallback } from 'react'
import { auth, setToken, getToken } from '../../../services/api'

export function useAdminAuth() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) { setChecking(false); return }
    auth.me()
      .then(u => setUser(u))
      .catch(() => setToken(null))
      .finally(() => setChecking(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const u = await auth.login(email, password)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async () => {
    await auth.logout()
    setUser(null)
  }, [])

  return { user, checking, login, logout }
}
