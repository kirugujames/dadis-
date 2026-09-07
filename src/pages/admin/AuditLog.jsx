import { ClipboardList } from 'lucide-react'
import ListPageTemplate from '../../components/patterns/ListPageTemplate'
import { auditLog } from '../../data/mockData'

export default function AuditLog() {
  return (
    <ListPageTemplate
      title="System Audit Log"
      description="A record of key actions taken across your organization's workspace."
      stats={[{ label: 'Events Logged (7d)', value: auditLog.length, icon: ClipboardList }]}
      columns={[
        { key: 'actor', header: 'Actor' },
        { key: 'action', header: 'Action' },
        { key: 'time', header: 'Timestamp' },
      ]}
      rows={auditLog}
      searchKeys={['actor', 'action']}
      searchPlaceholder="Search audit log…"
    />
  )
}
