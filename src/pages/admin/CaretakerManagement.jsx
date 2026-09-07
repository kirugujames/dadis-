import { useState } from 'react'
import { ShieldCheck, Plus, Eye } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import FormModal from '../../components/patterns/FormModal'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { Field, TextInput } from '../../components/ui/Field'
import { useToast } from '../../context/ToastContext'
import { caretakers as initialCaretakers } from '../../data/mockData'

export default function CaretakerManagement() {
  const { showToast } = useToast()
  const [caretakers, setCaretakers] = useState(initialCaretakers)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', properties: '' })

  const handleSubmit = () => {
    if (!form.name || !form.phone) return
    setCaretakers((prev) => [
      { id: `C-${String(prev.length + 1).padStart(2, '0')}`, name: form.name, phone: form.phone, properties: form.properties || '—', status: 'Active' },
      ...prev,
    ])
    showToast(`${form.name} added as a caretaker.`)
    setForm({ name: '', phone: '', properties: '' })
    setOpen(false)
  }

  return (
    <>
      <ListPageTemplate
        title="Caretaker Administration"
        description="Manage on-site caretakers and which properties they oversee."
        actions={<Button icon={Plus} onClick={() => setOpen(true)}>Add Caretaker</Button>}
        stats={[
          { label: 'Total Caretakers', value: caretakers.length, icon: ShieldCheck },
          { label: 'Active', value: caretakers.filter((c) => c.status === 'Active').length, icon: ShieldCheck, tone: 'brand' },
          { label: 'On Leave', value: caretakers.filter((c) => c.status === 'On Leave').length, icon: ShieldCheck, tone: 'orange' },
        ]}
        columns={[
          { key: 'name', header: 'Caretaker', render: (r) => (
            <div className="flex items-center gap-2.5">
              <Avatar name={r.name} size={30} />
              <p className="font-medium text-slate-800">{r.name}</p>
            </div>
          ) },
          { key: 'phone', header: 'Phone' },
          { key: 'properties', header: 'Assigned Properties' },
          { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          { key: 'actions', header: '', render: () => <Button variant="ghost" size="sm" icon={Eye}>View</Button> },
        ]}
        rows={caretakers}
        searchKeys={['name', 'properties']}
        searchPlaceholder="Search caretakers…"
      />

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Caretaker"
        description="Add on-site staff who'll manage day-to-day operations."
        onSubmit={handleSubmit}
        submitLabel="Add Caretaker"
      >
        <Field label="Full name">
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Kiptoo" />
        </Field>
        <Field label="Phone number">
          <TextInput required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+254 7XX XXX XXX" />
        </Field>
        <Field label="Assigned properties">
          <TextInput value={form.properties} onChange={(e) => setForm({ ...form, properties: e.target.value })} placeholder="e.g. Sunrise Court" />
        </Field>
      </FormModal>
    </>
  )
}
