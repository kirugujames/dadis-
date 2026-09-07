import { Building2, Home } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import { useAuth } from '../../context/AuthContext'
import { properties, units } from '../../data/mockData'

export default function LandlordProperties() {
  const { user } = useAuth()
  const myProperties = properties.filter((p) => p.landlord === user.name)
  const myUnits = units.filter((u) => myProperties.some((p) => p.name === u.property))

  return (
    <ListPageTemplate
      title="My Properties"
      description="Properties you own, managed by Nest on your behalf."
      stats={[
        { label: 'Properties', value: myProperties.length, icon: Building2 },
        { label: 'Total Units', value: myProperties.reduce((s, p) => s + p.units, 0), icon: Home, tone: 'blue' },
      ]}
      columns={[
        { key: 'name', header: 'Property', render: (r) => (
          <div>
            <p className="font-medium text-slate-800">{r.name}</p>
            <p className="text-xs text-slate-400">{r.location}</p>
          </div>
        ) },
        { key: 'caretaker', header: 'Caretaker' },
        { key: 'occupancy', header: 'Occupancy', render: (r) => `${r.occupied}/${r.units} units` },
      ]}
      rows={myProperties}
      searchKeys={['name', 'location']}
      searchPlaceholder="Search your properties…"
    />
  )
}
