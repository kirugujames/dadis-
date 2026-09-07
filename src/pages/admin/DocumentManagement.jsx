import { useState } from 'react'
import { FileText, Upload, Download } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import FormModal from '../../components/patterns/FormModal'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { Field, TextInput, Select } from '../../components/ui/Field'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { documents as initialDocuments } from '../../data/mockData'

export default function DocumentManagement() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [documents, setDocuments] = useState(initialDocuments)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'Lease' })

  const handleSubmit = () => {
    if (!form.name) return
    setDocuments((prev) => [
      { id: `D-${String(prev.length + 1).padStart(2, '0')}`, name: form.name, category: form.category, uploadedBy: user.name, date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
    showToast('Document uploaded.')
    setForm({ name: '', category: 'Lease' })
    setOpen(false)
  }

  return (
    <>
      <ListPageTemplate
        title="Document Management"
        description="Leases, title deeds, IDs, and inspection reports in one place."
        actions={<Button icon={Upload} onClick={() => setOpen(true)}>Upload Document</Button>}
        stats={[
          { label: 'Total Documents', value: documents.length, icon: FileText },
          { label: 'Leases', value: documents.filter((d) => d.category === 'Lease').length, icon: FileText, tone: 'blue' },
          { label: 'Title Deeds', value: documents.filter((d) => d.category === 'Title Deed').length, icon: FileText, tone: 'brand' },
        ]}
        columns={[
          { key: 'name', header: 'Document', render: (r) => (
            <span className="flex items-center gap-2 font-medium text-slate-800">
              <FileText size={15} className="text-slate-400" /> {r.name}
            </span>
          ) },
          { key: 'category', header: 'Category', render: (r) => <Badge tone="blue">{r.category}</Badge> },
          { key: 'uploadedBy', header: 'Uploaded By' },
          { key: 'date', header: 'Date' },
          { key: 'actions', header: '', render: () => <Button variant="ghost" size="sm" icon={Download}>Download</Button> },
        ]}
        rows={documents}
        searchKeys={['name', 'category', 'uploadedBy']}
        searchPlaceholder="Search documents…"
      />

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Upload Document"
        description="Add a file to the shared document repository."
        onSubmit={handleSubmit}
        submitLabel="Upload"
      >
        <Field label="File name">
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Lease Agreement - Nancy Wairimu.pdf" />
        </Field>
        <Field label="Category">
          <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Lease</option>
            <option>Title Deed</option>
            <option>Tenant ID</option>
            <option>Inspection</option>
          </Select>
        </Field>
        <p className="text-xs text-slate-400">This is a demo — no real file upload happens yet.</p>
      </FormModal>
    </>
  )
}
