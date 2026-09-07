import React, { createContext, useContext, useEffect, useState } from 'react'
import { DEMO_USERS } from '../data/roles'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.sessionStorage.getItem('nest.user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      window.sessionStorage.setItem('nest.user', JSON.stringify(user))
    } else {
      window.sessionStorage.removeItem('nest.user')
    }
  }, [user])

  // In a real app this would call an API. Here we match a demo account
  // by email, or fall back to matching by role so the login screen's
  // "quick access" buttons work without a password.
  const login = ({ email, role }) => {
    const match =
      DEMO_USERS.find((u) => u.email.toLowerCase() === (email || '').toLowerCase()) ||
      DEMO_USERS.find((u) => u.role === role)
    if (match) setUser(match)
    return match
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
