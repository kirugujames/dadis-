import { useState } from 'react'
import { Camera } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { Field, TextInput } from '../../components/ui/Field'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { ROLE_LABELS } from '../../data/roles'

export default function AccountSettings() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [tab, setTab] = useState('Profile')

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your personal details and preferences." />

      <Card padded={false} className="p-5">
        <Tabs tabs={['Profile', 'Notifications', 'Security']} active={tab} onChange={setTab} />

        {tab === 'Profile' && (
          <form
            className="max-w-lg space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              showToast('Profile updated.')
            }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar name={user.name} size={64} />
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-600"
                >
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-400">{ROLE_LABELS[user.role]} · {user.org}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name">
                <TextInput defaultValue={user.name} />
              </Field>
              <Field label="Phone number">
                <TextInput defaultValue="+254 712 345 678" />
              </Field>
            </div>
            <Field label="Email address">
              <TextInput type="email" defaultValue={user.email} />
            </Field>
            <Button type="submit">Save Changes</Button>
          </form>
        )}

        {tab === 'Notifications' && (
          <div className="max-w-lg space-y-3 text-sm">
            {['Payment confirmations', 'Rent due reminders', 'Maintenance updates', 'WhatsApp messages'].map((label) => (
              <label key={label} className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-700">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-500" />
              </label>
            ))}
          </div>
        )}

        {tab === 'Security' && (
          <div className="max-w-lg space-y-4">
            <p className="text-sm text-slate-500">
              Reset your password by email — we'll send a secure link to {user.email}.
            </p>
            <Button
              variant="secondary"
              type="button"
              onClick={() => showToast('Password reset link sent.')}
            >
              Send Password Reset Link
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
