import { Building2, Home } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { properties, units, formatKsh } from '../../data/mockData'

export default function CaretakerProperties() {
  const { user } = useAuth()
  const myProperties = properties.filter((p) => p.caretaker === user.name)
  const myPropertyNames = myProperties.map((p) => p.name)
  const myUnits = units.filter((u) => myPropertyNames.includes(u.property))
  const shownUnits = myUnits.length ? myUnits : units

  return (
    <ListPageTemplate
      title="Properties & Units"
      description="Units you're responsible for day-to-day."
      stats={[
        { label: 'Assigned Properties', value: myProperties.length || 1, icon: Building2 },
        { label: 'Vacant Units', value: shownUnits.filter((u) => u.status === 'Vacant').length, icon: Home, tone: 'orange' },
      ]}
      columns={[
        { key: 'unit', header: 'Unit', render: (r) => <span className="font-medium text-slate-800">{r.property} · {r.unit}</span> },
        { key: 'tenant', header: 'Tenant' },
        { key: 'rent', header: 'Rent', render: (r) => formatKsh(r.rent) },
        { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]}
      rows={shownUnits}
      searchKeys={['property', 'unit', 'tenant']}
      searchPlaceholder="Search units…"
    />
  )
}
