export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1 border-b border-slate-100 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3.5 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === tab
              ? 'border-brand-500 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
