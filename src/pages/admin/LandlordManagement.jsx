import { useState } from 'react'
import { UserCog, Building2, Plus, Eye } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import FormModal from '../../components/patterns/FormModal'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { Field, TextInput, Select } from '../../components/ui/Field'
import { useToast } from '../../context/ToastContext'
import { landlords as initialLandlords } from '../../data/mockData'

export default function LandlordManagement() {
  const { showToast } = useToast()
  const [landlords, setLandlords] = useState(initialLandlords)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', payoutMethod: 'Bank' })

  const handleSubmit = () => {
    if (!form.name || !form.phone) return
    setLandlords((prev) => [
      { id: `L-${String(prev.length + 1).padStart(2, '0')}`, name: form.name, phone: form.phone, properties: 0, units: 0, payoutMethod: form.payoutMethod, status: 'Active' },
      ...prev,
    ])
    showToast(`${form.name} added as a landlord.`)
    setForm({ name: '', phone: '', payoutMethod: 'Bank' })
    setOpen(false)
  }

  return (
    <>
      <ListPageTemplate
        title="Landlord Management"
        description="Manage property owners and their payout details."
        actions={<Button icon={Plus} onClick={() => setOpen(true)}>Add Landlord</Button>}
        stats={[
          { label: 'Total Landlords', value: landlords.length, icon: UserCog },
          { label: 'Properties Managed', value: landlords.reduce((s, l) => s + l.properties, 0), icon: Building2, tone: 'blue' },
          { label: 'Units Managed', value: landlords.reduce((s, l) => s + l.units, 0), icon: Building2, tone: 'brand' },
        ]}
        columns={[
          { key: 'name', header: 'Landlord', render: (r) => (
            <div className="flex items-center gap-2.5">
              <Avatar name={r.name} size={30} />
              <div>
                <p className="font-medium text-slate-800">{r.name}</p>
                <p className="text-xs text-slate-400">{r.phone}</p>
              </div>
            </div>
          ) },
          { key: 'properties', header: 'Properties' },
          { key: 'units', header: 'Units' },
          { key: 'payoutMethod', header: 'Payout Method' },
          { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          { key: 'actions', header: '', render: () => <Button variant="ghost" size="sm" icon={Eye}>View</Button> },
        ]}
        rows={landlords}
        searchKeys={['name', 'phone']}
        searchPlaceholder="Search landlords…"
      />

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Landlord"
        description="Register a new property owner."
        onSubmit={handleSubmit}
        submitLabel="Add Landlord"
      >
        <Field label="Full name">
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Susan Njoroge" />
        </Field>
        <Field label="Phone number">
          <TextInput required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+254 7XX XXX XXX" />
        </Field>
        <Field label="Payout method">
          <Select value={form.payoutMethod} onChange={(e) => setForm({ ...form, payoutMethod: e.target.value })}>
            <option>Bank</option>
            <option>M-Pesa</option>
          </Select>
        </Field>
      </FormModal>
    </>
  )
}
