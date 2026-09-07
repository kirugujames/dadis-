import { useState } from 'react'
import { Banknote, Users, Plus } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import FormModal from '../../components/patterns/FormModal'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { Field, TextInput } from '../../components/ui/Field'
import { useToast } from '../../context/ToastContext'
import { salaries as initialSalaries, formatKsh } from '../../data/mockData'

export default function SalaryManagement() {
  const { showToast } = useToast()
  const [salaries, setSalaries] = useState(initialSalaries)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', role: 'Caretaker', property: '', salary: '' })

  const totalPayroll = salaries.reduce((s, p) => s + p.salary, 0)

  const handleSubmit = () => {
    if (!form.name || !form.salary) return
    setSalaries((prev) => [
      { id: `S-${String(prev.length + 1).padStart(2, '0')}`, name: form.name, role: form.role, property: form.property || '—', salary: Number(form.salary), lastPaid: '—', status: 'Pending' },
      ...prev,
    ])
    showToast(`${form.name} added to payroll.`)
    setForm({ name: '', role: 'Caretaker', property: '', salary: '' })
    setOpen(false)
  }

  return (
    <>
      <ListPageTemplate
        title="Salary & Payroll"
        description="Manage caretaker and staff salaries across your properties."
        actions={<Button icon={Plus} onClick={() => setOpen(true)}>Add Staff Member</Button>}
        stats={[
          { label: 'Staff on Payroll', value: salaries.length, icon: Users },
          { label: 'Monthly Payroll', value: formatKsh(totalPayroll), icon: Banknote, tone: 'blue' },
          { label: 'Pending Payments', value: salaries.filter((s) => s.status === 'Pending').length, icon: Banknote, tone: 'orange' },
        ]}
        columns={[
          { key: 'name', header: 'Staff' },
          { key: 'role', header: 'Role' },
          { key: 'property', header: 'Assigned To' },
          { key: 'salary', header: 'Salary', render: (r) => formatKsh(r.salary) },
          { key: 'lastPaid', header: 'Last Paid' },
          { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        ]}
        rows={salaries}
        searchKeys={['name', 'role', 'property']}
        searchPlaceholder="Search staff…"
      />

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Staff Member"
        description="Add someone to payroll."
        onSubmit={handleSubmit}
        submitLabel="Add to Payroll"
      >
        <Field label="Full name">
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Peter Otieno" />
        </Field>
        <Field label="Role">
          <TextInput value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Caretaker" />
        </Field>
        <Field label="Assigned property">
          <TextInput value={form.property} onChange={(e) => setForm({ ...form, property: e.target.value })} placeholder="e.g. Riverside Court" />
        </Field>
        <Field label="Monthly salary (KSh)">
          <TextInput type="number" required value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="30000" />
        </Field>
      </FormModal>
    </>
  )
}
