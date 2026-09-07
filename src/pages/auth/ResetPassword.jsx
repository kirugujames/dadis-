import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { Field, TextInput } from '../../components/ui/Field'
import Button from '../../components/ui/Button'

export default function ResetPassword() {
  const [sent, setSent] = useState(false)

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

          {sent ? (
            <>
              <CheckCircle2 className="text-brand-500 mb-3" size={36} />
              <h2 className="text-2xl font-semibold text-slate-900 mb-1">Check your email</h2>
              <p className="text-sm text-slate-500 mb-6">
                We've sent password reset instructions to your inbox.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-slate-900 mb-1">Reset password</h2>
              <p className="text-sm text-slate-500 mb-6">
                Enter your account email and we'll send you a reset link.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <Field label="Email address">
                  <TextInput type="email" placeholder="you@nest.co.ke" required />
                </Field>
                <Button type="submit" className="w-full" icon={ArrowRight}>
                  Send reset link
                </Button>
              </form>
            </>
          )}

          <Link
            to="/login"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 mt-6"
          >
            <ArrowLeft size={15} /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
