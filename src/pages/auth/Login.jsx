import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { DEMO_USERS, ROLE_LABELS } from '../../data/roles'
import { TextInput, Field } from '../../components/ui/Field'
import Button from '../../components/ui/Button'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = login({ email })
    if (!user) {
      setError('No account found for that email. Try one of the demo accounts below.')
      return
    }
    navigate(`/${user.role}`)
  }

  const quickLogin = (role) => {
    const user = login({ role })
    if (user) navigate(`/${user.role}`)
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex w-1/2 bg-ink-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-500/10" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-brand-500/10" />
        <div className="flex items-center gap-2 relative">
          <span className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
            <Building2 size={20} className="text-white" />
          </span>
          <span className="font-semibold text-xl">Nest</span>
        </div>
        <div className="relative">
          <h1 className="text-3xl font-semibold leading-tight mb-3">
            Simplify rental operations in Kenya
          </h1>
          <p className="text-slate-400 max-w-sm">
            One platform for property managers, landlords, caretakers, and tenants —
            billing, maintenance, and communication in one place.
          </p>
        </div>
        <p className="text-xs text-slate-500 relative">© 2026 Nest. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </span>
            <span className="font-semibold text-xl text-slate-900">Nest</span>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-6">Sign in to your Nest workspace.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email address">
              <TextInput
                type="email"
                placeholder="you@nest.co.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <TextInput
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex items-center justify-end">
              <Link to="/reset-password" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" icon={ArrowRight}>
              Sign in
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
              Demo quick access
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => quickLogin(u.role)}
                  className="text-left px-3 py-2.5 rounded-lg border border-slate-200 hover:border-brand-400 hover:bg-brand-50/50 transition-colors"
                >
                  <p className="text-sm font-medium text-slate-800">{ROLE_LABELS[u.role]}</p>
                  <p className="text-xs text-slate-500 truncate">{u.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
