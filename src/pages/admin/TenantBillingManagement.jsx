import { Plus, Send } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { useToast } from '../../context/ToastContext'
import { tenants, formatKsh } from '../../data/mockData'
import { Users, Wallet, AlertTriangle, Receipt } from 'lucide-react'

export default function TenantBillingManagement() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const overdue = tenants.filter((t) => t.status === 'Overdue')
  const totalBalance = tenants.reduce((s, t) => s + t.balance, 0)

  return (
    <ListPageTemplate
      title="Tenants & Billing"
      description="Tenant directory with automated rent invoicing and balances. Click a tenant to view their full profile."
      actions={<Link to="/admin/tenant-onboarding"><Button icon={Plus}>Add Tenant</Button></Link>}
      onRowClick={(row) => navigate(`/admin/tenants/${row.id}`)}
      stats={[
        { label: 'Total Tenants', value: tenants.length, icon: Users },
        { label: 'Monthly Rent Roll', value: formatKsh(tenants.reduce((s, t) => s + t.rent, 0)), icon: Receipt, tone: 'blue' },
        { label: 'Outstanding Balance', value: formatKsh(totalBalance), icon: Wallet, tone: 'orange' },
        { label: 'Overdue Tenants', value: overdue.length, icon: AlertTriangle, tone: 'red' },
      ]}
      columns={[
        { key: 'name', header: 'Tenant', render: (r) => (
          <div className="flex items-center gap-2.5">
            <Avatar name={r.name} size={30} />
            <div>
              <p className="font-medium text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-400">{r.phone}</p>
            </div>
          </div>
        ) },
        { key: 'unit', header: 'Unit' },
        { key: 'rent', header: 'Rent', render: (r) => formatKsh(r.rent) },
        { key: 'balance', header: 'Balance', render: (r) => (r.balance > 0 ? formatKsh(r.balance) : '—') },
        { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'actions', header: '', render: (r) => (
          <Button
            variant="ghost"
            size="sm"
            icon={Send}
            onClick={(e) => {
              e.stopPropagation()
              showToast(`Reminder sent to ${r.name}.`)
            }}
          >
            Remind
          </Button>
        ) },
      ]}
      rows={tenants}
      searchKeys={['name', 'unit', 'phone']}
      searchPlaceholder="Search tenants…"
    />
  )
}
