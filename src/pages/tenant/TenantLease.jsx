import { Home, User, Calendar, Wallet } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import { tenantLease, formatKsh } from '../../data/mockData'

const rows = [
  { icon: Home, label: 'Property', value: tenantLease.property },
  { icon: Home, label: 'Unit', value: tenantLease.unit },
  { icon: User, label: 'Landlord', value: tenantLease.landlord },
  { icon: User, label: 'Caretaker', value: tenantLease.caretaker },
  { icon: Calendar, label: 'Lease Start', value: tenantLease.leaseStart },
  { icon: Calendar, label: 'Lease End', value: tenantLease.leaseEnd },
  { icon: Wallet, label: 'Monthly Rent', value: formatKsh(tenantLease.rent) },
  { icon: Wallet, label: 'Security Deposit', value: formatKsh(tenantLease.deposit) },
]

export default function TenantLease() {
  return (
    <div>
      <PageHeader title="My Lease & Unit" description="Details of your current tenancy agreement." />
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <r.icon size={16} />
              </span>
              <div>
                <p className="text-xs text-slate-400">{r.label}</p>
                <p className="text-sm font-medium text-slate-800">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
