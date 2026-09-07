const TONE_STYLES = {
  green: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  red: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
  orange: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  purple: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
  slate: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
}

// Maps common status strings used across the app to a visual tone, so every
// table shows the same word in the same color without repeating logic.
const STATUS_TONE = {
  active: 'green', current: 'green', paid: 'green', reconciled: 'green',
  occupied: 'green', completed: 'green', 'in progress': 'blue',
  pending: 'orange', partial: 'orange', 'on leave': 'orange',
  overdue: 'red', unmatched: 'red', suspended: 'red', vacant: 'orange',
  'under maintenance': 'purple', screening: 'purple',
  'viewing scheduled': 'blue', 'application received': 'blue',
}

export default function Badge({ children, tone }) {
  const resolvedTone = tone || STATUS_TONE[String(children).toLowerCase()] || 'slate'
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${TONE_STYLES[resolvedTone]}`}
    >
      {children}
    </span>
  )
}
