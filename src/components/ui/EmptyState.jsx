import { Inbox } from 'lucide-react'

export default function EmptyState({ message = 'Nothing here yet.', hint }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400">
      <Inbox size={28} className="mb-2" />
      <p className="text-sm font-medium text-slate-500">{message}</p>
      {hint && <p className="text-xs mt-1 max-w-xs">{hint}</p>}
    </div>
  )
}
