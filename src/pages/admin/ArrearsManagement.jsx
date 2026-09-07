import { useState } from 'react'
import { AlertTriangle, Wallet, Send, Clock } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import { arrears as initialArrears, formatKsh } from '../../data/mockData'

export default function ArrearsManagement() {
  const { showToast } = useToast()
  const [arrears, setArrears] = useState(initialArrears)

  const total = arrears.reduce((s, a) => s + a.amount, 0)
  const critical = arrears.filter((a) => a.daysOverdue > 30)

  const remind = (id, tenant) => {
    setArrears((prev) => prev.map((a) => (a.id === id ? { ...a, lastReminder: new Date().toISOString().slice(0, 10) } : a)))
    showToast(`Reminder sent to ${tenant}.`)
  }

  return (
    <ListPageTemplate
      title="Arrears & Defaulter Tracking"
      description="Follow up on overdue balances before they escalate."
      stats={[
        { label: 'Tenants in Arrears', value: arrears.length, icon: AlertTriangle, tone: 'red' },
        { label: 'Total Outstanding', value: formatKsh(total), icon: Wallet, tone: 'orange' },
        { label: 'Over 30 Days', value: critical.length, icon: Clock, tone: 'red' },
        { label: 'Reminders Sent (7d)', value: 9, icon: Send, tone: 'blue' },
      ]}
      columns={[
        { key: 'tenant', header: 'Tenant' },
        { key: 'unit', header: 'Unit' },
        { key: 'daysOverdue', header: 'Days Overdue', render: (r) => (
          <Badge tone={r.daysOverdue > 30 ? 'red' : 'orange'}>{r.daysOverdue} days</Badge>
        ) },
        { key: 'amount', header: 'Amount Due', render: (r) => formatKsh(r.amount) },
        { key: 'lastReminder', header: 'Last Reminder' },
        { key: 'actions', header: '', render: (r) => (
          <Button variant="secondary" size="sm" icon={Send} onClick={() => remind(r.id, r.tenant)}>Send Reminder</Button>
        ) },
      ]}
      rows={arrears}
      searchKeys={['tenant', 'unit']}
      searchPlaceholder="Search arrears…"
    />
  )
}
