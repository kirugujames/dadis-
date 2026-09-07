import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Wallet, Download, PiggyBank } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { revenueTrend, formatKsh } from '../../data/mockData'

export default function LandlordFinancialReports() {
  const totalPayout = revenueTrend.reduce((s, r) => s + r.revenue * 0.25, 0)

  return (
    <div>
      <PageHeader
        title="Financial Reports"
        description="Your payout history and statements."
        actions={<Button variant="secondary" icon={Download}>Download Statement</Button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <StatCard label="Payouts (6mo)" value={formatKsh(totalPayout)} icon={Wallet} />
        <StatCard label="Management Fee Rate" value="10%" icon={PiggyBank} tone="blue" />
      </div>
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Monthly Payout Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueTrend.map((r) => ({ ...r, payout: Math.round(r.revenue * 0.25) }))}>
            <defs>
              <linearGradient id="payout" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b98a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#14b98a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => formatKsh(v)} />
            <Area type="monotone" dataKey="payout" stroke="#14b98a" strokeWidth={2} fill="url(#payout)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
