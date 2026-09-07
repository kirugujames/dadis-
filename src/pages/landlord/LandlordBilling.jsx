import { Users, Wallet } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import { useAuth } from '../../context/AuthContext'
import { properties, tenants, formatKsh } from '../../data/mockData'

export default function LandlordBilling() {
  const { user } = useAuth()
  const myPropertyNames = properties.filter((p) => p.landlord === user.name).map((p) => p.name)
  const myTenants = tenants.filter((t) => myPropertyNames.some((name) => t.unit.startsWith(name.split(' ')[0])))
  const shown = myTenants.length ? myTenants : tenants.slice(0, 3)

  return (
    <ListPageTemplate
      title="Tenants & Billing"
      description="Tenants across your properties and their current balances."
      stats={[
        { label: 'Tenants', value: shown.length, icon: Users },
        { label: 'Monthly Rent Roll', value: formatKsh(shown.reduce((s, t) => s + t.rent, 0)), icon: Wallet, tone: 'brand' },
      ]}
      columns={[
        { key: 'name', header: 'Tenant', render: (r) => (
          <div className="flex items-center gap-2.5">
            <Avatar name={r.name} size={30} />
            <p className="font-medium text-slate-800">{r.name}</p>
          </div>
        ) },
        { key: 'unit', header: 'Unit' },
        { key: 'rent', header: 'Rent', render: (r) => formatKsh(r.rent) },
        { key: 'balance', header: 'Balance', render: (r) => (r.balance > 0 ? formatKsh(r.balance) : '—') },
        { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]}
      rows={shown}
      searchKeys={['name', 'unit']}
      searchPlaceholder="Search tenants…"
    />
  )
}
