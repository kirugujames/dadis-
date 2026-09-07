import { useState } from 'react'
import { HardHat, Wallet, Plus } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import FormModal from '../../components/patterns/FormModal'
import { Field, TextInput } from '../../components/ui/Field'
import { useToast } from '../../context/ToastContext'
import { constructionProjects as initialProjects, formatKsh } from '../../data/mockData'

export default function ConstructionManagement() {
  const { showToast } = useToast()
  const [projects, setProjects] = useState(initialProjects)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', budget: '' })

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0)
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0)

  const handleSubmit = () => {
    if (!form.name || !form.budget) return
    setProjects((prev) => [
      { id: `CP-${String(prev.length + 1).padStart(2, '0')}`, name: form.name, location: form.location, budget: Number(form.budget), spent: 0, progress: 0, status: 'In Progress' },
      ...prev,
    ])
    showToast('Project created.')
    setForm({ name: '', location: '', budget: '' })
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Construction & Renovation"
        description="Track budgets and progress for ongoing capital projects."
        actions={<Button icon={Plus} onClick={() => setOpen(true)}>New Project</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active Projects" value={projects.filter((p) => p.status === 'In Progress').length} icon={HardHat} />
        <StatCard label="Total Budget" value={formatKsh(totalBudget)} icon={Wallet} tone="blue" />
        <StatCard label="Spent to Date" value={formatKsh(totalSpent)} icon={Wallet} tone="orange" />
        <StatCard label="Completed" value={projects.filter((p) => p.status === 'Completed').length} icon={HardHat} tone="brand" />
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-400">{p.location}</p>
              </div>
              <Badge>{p.status}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
              <span>{formatKsh(p.spent)} spent of {formatKsh(p.budget)}</span>
              <span className="font-medium text-slate-700">{p.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${p.progress === 100 ? 'bg-brand-500' : 'bg-blue-500'}`}
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="New Construction Project"
        description="Start tracking a new capital project."
        onSubmit={handleSubmit}
        submitLabel="Create Project"
      >
        <Field label="Project name">
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Palm Heights Rooftop Repair" />
        </Field>
        <Field label="Location">
          <TextInput value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Nyali, Mombasa" />
        </Field>
        <Field label="Budget (KSh)">
          <TextInput type="number" required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="2000000" />
        </Field>
      </FormModal>
    </div>
  )
}
