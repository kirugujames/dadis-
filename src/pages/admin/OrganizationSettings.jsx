import { useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import { Field, TextInput, Select } from '../../components/ui/Field'

export default function OrganizationSettings() {
  const [tab, setTab] = useState('Organization')

  return (
    <div>
      <PageHeader title="Organization & System Settings" description="Configure your workspace, billing, and integrations." />
      <Card padded={false} className="p-5">
        <Tabs tabs={['Organization', 'Billing', 'Notifications', 'Integrations']} active={tab} onChange={setTab} />

        {tab === 'Organization' && (
          <form className="space-y-4 max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <Field label="Organization name">
              <TextInput defaultValue="Nest HQ" />
            </Field>
            <Field label="Support email">
              <TextInput defaultValue="support@nest.co.ke" />
            </Field>
            <Field label="Default currency">
              <Select defaultValue="KES">
                <option value="KES">Kenyan Shilling (KSh)</option>
                <option value="USD">US Dollar ($)</option>
              </Select>
            </Field>
            <Field label="Timezone">
              <Select defaultValue="EAT">
                <option value="EAT">East Africa Time (GMT+3)</option>
              </Select>
            </Field>
            <Button type="submit">Save Changes</Button>
          </form>
        )}

        {tab === 'Billing' && (
          <div className="max-w-lg space-y-4 text-sm text-slate-600">
            <p>Your plan: <span className="font-medium text-slate-900">Nest Pro — 150 units</span></p>
            <p>Next invoice: <span className="font-medium text-slate-900">KSh 15,000</span> on 1 Oct 2026</p>
            <Button variant="secondary">Manage Billing</Button>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="max-w-lg space-y-3 text-sm">
            {['Rent overdue alerts', 'New payment received', 'New vacancy leads', 'Maintenance requests'].map((label) => (
              <label key={label} className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-700">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-500" />
              </label>
            ))}
          </div>
        )}

        {tab === 'Integrations' && (
          <div className="max-w-lg space-y-3">
            {['M-Pesa Daraja API', 'WhatsApp Business API', 'Bank Reconciliation Feed'].map((label) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <span className="text-xs font-medium text-emerald-600">Connected</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
