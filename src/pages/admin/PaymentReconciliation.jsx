import { useState } from 'react'
import { CheckCircle2, Wallet, AlertCircle, Clock } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import { payments as initialPayments, formatKsh } from '../../data/mockData'

export default function PaymentReconciliation() {
  const { showToast } = useToast()
  const [payments, setPayments] = useState(initialPayments)

  const unmatched = payments.filter((p) => p.status === 'Unmatched')
  const pending = payments.filter((p) => p.status === 'Pending')
  const total = payments.reduce((s, p) => s + p.amount, 0)

  const match = (id, tenant) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'Reconciled' } : p)))
    showToast(`Payment matched to ${tenant}'s invoice.`)
  }

  return (
    <ListPageTemplate
      title="Payment Reconciliation"
      description="Match M-Pesa and bank payments against tenant invoices."
      stats={[
        { label: 'Total Received', value: formatKsh(total), icon: Wallet },
        { label: 'Reconciled', value: payments.filter((p) => p.status === 'Reconciled').length, icon: CheckCircle2, tone: 'brand' },
        { label: 'Pending', value: pending.length, icon: Clock, tone: 'orange' },
        { label: 'Unmatched', value: unmatched.length, icon: AlertCircle, tone: 'red' },
      ]}
      columns={[
        { key: 'id', header: 'Reference' },
        { key: 'tenant', header: 'Payer' },
        { key: 'method', header: 'Channel' },
        { key: 'amount', header: 'Amount', render: (r) => formatKsh(r.amount) },
        { key: 'date', header: 'Date' },
        { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'actions', header: '', render: (r) => r.status !== 'Reconciled' && (
          <Button variant="secondary" size="sm" onClick={() => match(r.id, r.tenant)}>Match</Button>
        ) },
      ]}
      rows={payments}
      searchKeys={['tenant', 'id', 'method']}
      searchPlaceholder="Search payments…"
    />
  )
}
