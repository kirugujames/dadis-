import { FileText, Download } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const docs = [
  { id: 'D-01', name: 'Signed Lease Agreement.pdf', date: '2025-06-01' },
  { id: 'D-02', name: 'September Rent Receipt.pdf', date: '2026-09-01' },
  { id: 'D-03', name: 'Move-in Inspection Report.pdf', date: '2025-06-02' },
]

export default function TenantDocuments() {
  return (
    <div>
      <PageHeader title="My Documents" description="Your lease, receipts, and inspection reports." />
      <Card padded={false}>
        {docs.map((d) => (
          <div key={d.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText size={17} />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-800">{d.name}</p>
                <p className="text-xs text-slate-400">{d.date}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" icon={Download}>Download</Button>
          </div>
        ))}
      </Card>
    </div>
  )
}
