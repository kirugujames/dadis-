import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import Tabs from '../../components/ui/Tabs'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { properties, units, formatKsh } from '../../data/mockData'
import { Building2, Home, Users } from 'lucide-react'

export default function PropertyUnitManagement() {
  const [tab, setTab] = useState('Properties')
  const navigate = useNavigate()

  const propertyColumns = [
    { key: 'name', header: 'Property', render: (r) => (
      <div>
        <p className="font-medium text-slate-800">{r.name}</p>
        <p className="text-xs text-slate-400">{r.location}</p>
      </div>
    ) },
    { key: 'type', header: 'Type' },
    { key: 'landlord', header: 'Landlord' },
    { key: 'caretaker', header: 'Caretaker' },
    { key: 'occupancy', header: 'Occupancy', render: (r) => `${r.occupied}/${r.units} units` },
  ]

  const unitColumns = [
    { key: 'unit', header: 'Unit', render: (r) => <span className="font-medium text-slate-800">{r.property} · {r.unit}</span> },
    { key: 'bedrooms', header: 'Bedrooms' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'rent', header: 'Rent', render: (r) => formatKsh(r.rent) },
    { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
  ]

  return (
    <div>
      <PageHeader
        title="Properties & Units"
        description="Manage every property, block, and unit in your portfolio. Click a property to view its units."
        actions={<Link to="/admin/property-onboarding"><Button icon={Plus}>Add Property</Button></Link>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Properties" value={properties.length} icon={Building2} />
        <StatCard label="Total Units" value={units.length * 3} icon={Home} tone="blue" />
        <StatCard label="Occupied" value={`${properties.reduce((s, p) => s + p.occupied, 0)}`} icon={Users} tone="brand" />
        <StatCard label="Vacant" value={units.filter((u) => u.status === 'Vacant').length} icon={Home} tone="orange" />
      </div>

      <Card padded={false} className="p-5">
        <Tabs tabs={['Properties', 'Units']} active={tab} onChange={setTab} />
        {tab === 'Properties' ? (
          <DataTable
            columns={propertyColumns}
            rows={properties}
            searchKeys={['name', 'location', 'landlord']}
            searchPlaceholder="Search properties…"
            onRowClick={(row) => navigate(`/admin/properties/${row.id}`)}
          />
        ) : (
          <DataTable columns={unitColumns} rows={units} searchKeys={['property', 'unit', 'tenant']} searchPlaceholder="Search units…" />
        )}
      </Card>
    </div>
  )
}
