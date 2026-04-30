import { useAuthStore } from '@/stores/auth-store'

async function tryRefresh(): Promise<string | null> {
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) return null
    const data = await res.json()
    const token = data.tokens?.accessToken || null
    if (token) {
      useAuthStore.getState().auth.setAccessToken(token)
    }
    return token
  } catch {
    return null
  }
}

// Fetch wrapper that auto-refreshes the access token on 401
export async function authFetch(
  input: RequestInfo,
  init: RequestInit & { _retried?: boolean } = {}
): Promise<Response> {
  const token = useAuthStore.getState().auth.accessToken

  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(input, { ...init, headers })

  if (res.status === 401 && !init._retried) {
    const newToken = await tryRefresh()
    if (!newToken) {
      // Refresh failed — redirect to login
      useAuthStore.getState().auth.reset()
      window.location.href = '/admin/sign-in'
      return res
    }
    headers.set('Authorization', `Bearer ${newToken}`)
    return fetch(input, { ...init, headers, _retried: true } as RequestInit)
  }

  return res
}
