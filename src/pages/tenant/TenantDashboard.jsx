import { useState } from 'react'
import { Home, Wallet, Calendar, CheckCircle2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PayRentModal from '../../components/patterns/PayRentModal'
import { tenantLease, tenantPaymentHistory, formatKsh } from '../../data/mockData'

export default function TenantDashboard() {
  const [payOpen, setPayOpen] = useState(false)

  return (
    <div>
      <PageHeader
        title="Welcome back, Brian"
        description={`${tenantLease.property} · Unit ${tenantLease.unit}`}
        actions={<Button onClick={() => setPayOpen(true)}>Pay Rent</Button>}
      />
      <PayRentModal open={payOpen} onClose={() => setPayOpen(false)} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Monthly Rent" value={formatKsh(tenantLease.rent)} icon={Home} />
        <StatCard
          label="Balance Due"
          value={tenantLease.balance > 0 ? formatKsh(tenantLease.balance) : 'KSh 0'}
          icon={Wallet}
          tone={tenantLease.balance > 0 ? 'red' : 'brand'}
        />
        <StatCard label="Lease Ends" value={new Date(tenantLease.leaseEnd).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })} icon={Calendar} tone="blue" />
        <StatCard label="Payment Status" value="Up to date" icon={CheckCircle2} tone="brand" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5 pb-0 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Payment History</h3>
          </div>
          <div className="p-5 space-y-1">
            {tenantPaymentHistory.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 text-sm">
                <div>
                  <p className="font-medium text-slate-800">{p.date}</p>
                  <p className="text-xs text-slate-400">{p.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{formatKsh(p.amount)}</p>
                  <Badge>{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 mb-3">Lease Details</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Landlord</span><span className="font-medium text-slate-800">{tenantLease.landlord}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Caretaker</span><span className="font-medium text-slate-800">{tenantLease.caretaker}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Deposit</span><span className="font-medium text-slate-800">{formatKsh(tenantLease.deposit)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Lease Start</span><span className="font-medium text-slate-800">{tenantLease.leaseStart}</span></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
