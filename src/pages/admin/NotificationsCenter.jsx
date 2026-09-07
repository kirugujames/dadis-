import { Bell, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { notifications } from '../../data/mockData'

const ICONS = { alert: AlertTriangle, success: CheckCircle2, info: Info }
const TONES = {
  alert: 'bg-red-50 text-red-600',
  success: 'bg-emerald-50 text-emerald-600',
  info: 'bg-blue-50 text-blue-600',
}

export default function NotificationsCenter() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="System alerts, payment updates, and lead activity."
        actions={<Button variant="secondary">Mark all as read</Button>}
      />
      <Card padded={false}>
        {notifications.map((n) => {
          const Icon = ICONS[n.type] || Bell
          return (
            <div key={n.id} className="flex items-start gap-3.5 p-4 border-b border-slate-50 last:border-0">
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${TONES[n.type]}`}>
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">{n.title}</p>
                <p className="text-sm text-slate-500">{n.body}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">{n.time}</span>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
