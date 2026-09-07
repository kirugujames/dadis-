import { Building2, Wallet, Users, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { properties, tenants, revenueTrend, formatKsh } from '../../data/mockData'

export default function LandlordDashboard() {
  const { user } = useAuth()
  const myProperties = properties.filter((p) => p.landlord === user.name)
  const myUnits = myProperties.reduce((s, p) => s + p.units, 0)
  const myOccupied = myProperties.reduce((s, p) => s + p.occupied, 0)
  const myRevenue = myProperties.length * 320000

  return (
    <div>
      <PageHeader
        title={`Good morning, ${user.name.split(' ')[0]}`}
        description="Here's how your properties are performing."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="My Properties" value={myProperties.length} icon={Building2} />
        <StatCard label="Occupied Units" value={`${myOccupied}/${myUnits}`} icon={Users} tone="blue" />
        <StatCard label="Revenue This Month" value={formatKsh(myRevenue)} icon={Wallet} tone="brand" trend={5} trendLabel="vs last month" />
        <StatCard label="Occupancy Rate" value={`${Math.round((myOccupied / myUnits) * 100)}%`} icon={TrendingUp} tone="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-slate-900 mb-4">Payouts Received</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => formatKsh(v)} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="revenue" fill="#14b98a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 mb-3">My Properties</h3>
          <div className="space-y-3">
            {myProperties.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.location}</p>
                </div>
                <Badge tone="green">{p.occupied}/{p.units}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
