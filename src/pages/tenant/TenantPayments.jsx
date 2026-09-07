import { useState } from 'react'
import { Wallet, Receipt } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PayRentModal from '../../components/patterns/PayRentModal'
import { tenantPaymentHistory, tenantLease, formatKsh } from '../../data/mockData'

export default function TenantPayments() {
  const [payOpen, setPayOpen] = useState(false)

  return (
    <>
    <ListPageTemplate
      title="Payments & Billing"
      description="Your rent payment history and current balance."
      actions={<Button onClick={() => setPayOpen(true)}>Pay Rent</Button>}
      stats={[
        { label: 'Monthly Rent', value: formatKsh(tenantLease.rent), icon: Receipt },
        { label: 'Current Balance', value: tenantLease.balance > 0 ? formatKsh(tenantLease.balance) : 'KSh 0', icon: Wallet, tone: tenantLease.balance > 0 ? 'red' : 'brand' },
      ]}
      columns={[
        { key: 'date', header: 'Date' },
        { key: 'amount', header: 'Amount', render: (r) => formatKsh(r.amount) },
        { key: 'method', header: 'Method' },
        { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]}
      rows={tenantPaymentHistory}
      searchKeys={['date', 'method']}
      searchPlaceholder="Search payments…"
    />
    <PayRentModal open={payOpen} onClose={() => setPayOpen(false)} />
    </>
  )
}
