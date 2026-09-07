import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, Building2, Edit3 } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Tabs from '../../components/ui/Tabs'
import DataTable from '../../components/ui/DataTable'
import { properties, units, documents, formatKsh } from '../../data/mockData'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Units')
  const property = properties.find((p) => p.id === id) || properties[0]
  const propertyUnits = units.filter((u) => u.property === property.name)

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Building2 size={24} />
            </span>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">{property.name}</h1>
              <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={13} /> {property.location}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge tone="blue">{property.type}</Badge>
                <span className="text-xs text-slate-400">Landlord: {property.landlord}</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" icon={Edit3}>Edit Property</Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <p className="text-xs text-slate-400 mb-1">Total Units</p>
          <p className="text-lg font-semibold text-slate-900">{property.units}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-400 mb-1">Occupied</p>
          <p className="text-lg font-semibold text-slate-900">{property.occupied}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-400 mb-1">Vacant</p>
          <p className="text-lg font-semibold text-amber-600">{property.units - property.occupied}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-400 mb-1">Caretaker</p>
          <p className="text-lg font-semibold text-slate-900 truncate">{property.caretaker}</p>
        </Card>
      </div>

      <Card padded={false} className="p-5">
        <Tabs tabs={['Units', 'Documents']} active={tab} onChange={setTab} />

        {tab === 'Units' ? (
          <DataTable
            columns={[
              { key: 'unit', header: 'Unit' },
              { key: 'bedrooms', header: 'Bedrooms' },
              { key: 'tenant', header: 'Tenant' },
              { key: 'rent', header: 'Rent', render: (r) => formatKsh(r.rent) },
              { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={propertyUnits.length ? propertyUnits : units.slice(0, 3)}
            searchKeys={['unit', 'tenant']}
            searchPlaceholder="Search units…"
          />
        ) : (
          <div className="space-y-1">
            {documents.slice(0, 2).map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 text-sm">
                <span className="text-slate-700">{d.name}</span>
                <span className="text-xs text-slate-400">{d.date}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
