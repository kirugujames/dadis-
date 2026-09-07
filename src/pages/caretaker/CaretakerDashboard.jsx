import { Building2, Wrench, MessageCircle, AlertTriangle } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { properties, units, arrears } from '../../data/mockData'

export default function CaretakerDashboard() {
  const { user } = useAuth()
  const myProperties = properties.filter((p) => p.caretaker === user.name)
  const myUnits = units.filter((u) => myProperties.some((p) => p.name === u.property))
  const maintenanceUnits = myUnits.filter((u) => u.status === 'Under Maintenance')

  return (
    <div>
      <PageHeader
        title={`Hi ${user.name.split(' ')[0]}, here's today's overview`}
        description="Your assigned properties and open tasks."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Assigned Properties" value={myProperties.length} icon={Building2} />
        <StatCard label="Units Managed" value={myUnits.length || properties[0].units} icon={Building2} tone="blue" />
        <StatCard label="Open Maintenance" value={maintenanceUnits.length || 1} icon={Wrench} tone="orange" />
        <StatCard label="Overdue Tenants" value={arrears.length} icon={AlertTriangle} tone="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-semibold text-slate-900 mb-3">My Properties</h3>
          <div className="space-y-3">
            {(myProperties.length ? myProperties : properties.slice(0, 2)).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.location}</p>
                </div>
                <Badge tone="green">{p.occupied}/{p.units}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 mb-3">Recent Tenant Messages</h3>
          <div className="space-y-3 text-sm">
            <p className="text-slate-600 flex items-start gap-2"><MessageCircle size={15} className="mt-0.5 text-brand-500 shrink-0" /> Fatuma Hassan: "Can someone check the water heater?"</p>
            <p className="text-slate-600 flex items-start gap-2"><MessageCircle size={15} className="mt-0.5 text-brand-500 shrink-0" /> Mercy Achieng: "I will clear the balance by Friday."</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
