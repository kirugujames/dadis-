import { Link, useNavigate } from 'react-router-dom'
import { Building2, Users, Wallet, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { properties, payments, revenueTrend, occupancyBreakdown, formatKsh } from '../../data/mockData'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0)
  const occupiedUnits = properties.reduce((sum, p) => sum + p.occupied, 0)

  return (
    <div>
      <PageHeader
        title="Welcome back, Amina"
        description="Here's what's happening across your portfolio today."
        actions={<Link to="/admin/property-onboarding"><Button>+ Add Property</Button></Link>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Properties" value={properties.length} icon={Building2} trend={4} trendLabel="vs last month" />
        <StatCard label="Occupied Units" value={`${occupiedUnits}/${totalUnits}`} icon={Users} tone="blue" trend={2} trendLabel="vs last month" />
        <StatCard label="Revenue This Month" value={formatKsh(980000)} icon={Wallet} tone="brand" trend={-8} trendLabel="vs last month" />
        <StatCard label="Overdue Balances" value={formatKsh(87000)} icon={AlertTriangle} tone="red" trend={12} trendLabel="vs last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Revenue vs Expenses</h3>
            <span className="text-xs text-slate-400">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => formatKsh(v)} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#14b98a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 mb-4">Occupancy</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={occupancyBreakdown} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                {occupancyBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {occupancyBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="font-medium text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5 pb-0 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent Payments</h3>
            <Link to="/admin/financial-reports" className="text-xs font-medium text-brand-600 hover:text-brand-700">View all</Link>
          </div>
          <div className="p-5 space-y-1">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={p.tenant} size={32} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{p.tenant}</p>
                    <p className="text-xs text-slate-400">{p.method} · {p.date}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-slate-800">{formatKsh(p.amount)}</p>
                  <Badge>{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 mb-3">Portfolio Snapshot</h3>
          <div className="space-y-3">
            {properties.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/admin/properties/${p.id}`)}
                className="w-full flex items-center justify-between text-sm text-left hover:bg-slate-50 -mx-1 px-1 py-1 rounded-md"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.location}</p>
                </div>
                <span className="text-xs font-medium text-slate-500 shrink-0 ml-2">
                  {p.occupied}/{p.units}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
