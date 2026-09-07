import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Download, Wallet, TrendingUp, Receipt, PiggyBank } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { payments, revenueTrend, formatKsh } from '../../data/mockData'

export default function FinancialReports() {
  const totalRevenue = revenueTrend.reduce((s, r) => s + r.revenue, 0)
  const totalExpenses = revenueTrend.reduce((s, r) => s + r.expenses, 0)

  return (
    <div>
      <PageHeader
        title="Financial Reports & Payments"
        description="Track income, expenses, and net position across your portfolio."
        actions={<Button variant="secondary" icon={Download}>Export Report</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue (6mo)" value={formatKsh(totalRevenue)} icon={Wallet} />
        <StatCard label="Total Expenses (6mo)" value={formatKsh(totalExpenses)} icon={Receipt} tone="orange" />
        <StatCard label="Net Income" value={formatKsh(totalRevenue - totalExpenses)} icon={PiggyBank} tone="brand" />
        <StatCard label="Collection Rate" value="94%" icon={TrendingUp} tone="blue" trend={3} trendLabel="vs last month" />
      </div>

      <Card className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueTrend}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b98a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#14b98a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => formatKsh(v)} />
            <Area type="monotone" dataKey="revenue" stroke="#14b98a" strokeWidth={2} fill="url(#rev)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card padded={false} className="p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Transactions</h3>
        <DataTable
          columns={[
            { key: 'id', header: 'Reference' },
            { key: 'tenant', header: 'Tenant' },
            { key: 'method', header: 'Method' },
            { key: 'amount', header: 'Amount', render: (r) => formatKsh(r.amount) },
            { key: 'date', header: 'Date' },
            { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          ]}
          rows={payments}
          searchKeys={['tenant', 'id']}
          searchPlaceholder="Search transactions…"
        />
      </Card>
    </div>
  )
}
