import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Wallet, Plus, TrendingDown } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import FormModal from '../../components/patterns/FormModal'
import { Field, TextInput, Select } from '../../components/ui/Field'
import { useToast } from '../../context/ToastContext'
import { expenses as initialExpenses, properties, formatKsh } from '../../data/mockData'

const CATEGORY_COLORS = { Maintenance: '#14b98a', Security: '#3b82f6', Grounds: '#f59e0b', Other: '#94a3b8' }

export default function ExpenseManagement() {
  const { showToast } = useToast()
  const [expenses, setExpenses] = useState(initialExpenses)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ description: '', property: properties[0].name, category: 'Maintenance', amount: '' })

  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const byCategory = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#94a3b8' }))

  const handleSubmit = () => {
    if (!form.description || !form.amount) return
    setExpenses((prev) => [
      { id: `E-${String(prev.length + 1).padStart(2, '0')}`, description: form.description, property: form.property, category: form.category, amount: Number(form.amount), date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
    showToast('Expense logged.')
    setForm({ description: '', property: properties[0].name, category: 'Maintenance', amount: '' })
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Expense Management"
        description="Track operating costs across maintenance, security, and grounds."
        actions={<Button icon={Plus} onClick={() => setOpen(true)}>Log Expense</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <StatCard label="Total Expenses (30d)" value={formatKsh(total)} icon={Wallet} tone="orange" />
        <StatCard label="Entries Logged" value={expenses.length} icon={Wallet} />
        <StatCard label="Vs. Last Month" value="-6%" icon={TrendingDown} tone="brand" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card padded={false} className="p-5 lg:col-span-2">
          <h3 className="font-semibold text-slate-900 mb-4">Expense Log</h3>
          <DataTable
            columns={[
              { key: 'description', header: 'Description' },
              { key: 'property', header: 'Property' },
              { key: 'category', header: 'Category' },
              { key: 'amount', header: 'Amount', render: (r) => formatKsh(r.amount) },
              { key: 'date', header: 'Date' },
            ]}
            rows={expenses}
            searchKeys={['description', 'property', 'category']}
            searchPlaceholder="Search expenses…"
          />
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 mb-4">By Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" innerRadius={45} outerRadius={72} paddingAngle={3}>
                {byCategory.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatKsh(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {byCategory.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="font-medium text-slate-800">{formatKsh(c.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Log Expense"
        description="Record an operating cost against a property."
        onSubmit={handleSubmit}
        submitLabel="Log Expense"
      >
        <Field label="Description">
          <TextInput required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Plumbing repair - Unit C2" />
        </Field>
        <Field label="Property">
          <Select value={form.property} onChange={(e) => setForm({ ...form, property: e.target.value })}>
            {properties.map((p) => <option key={p.id}>{p.name}</option>)}
          </Select>
        </Field>
        <Field label="Category">
          <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Maintenance</option>
            <option>Security</option>
            <option>Grounds</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Amount (KSh)">
          <TextInput type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="8500" />
        </Field>
      </FormModal>
    </div>
  )
}
