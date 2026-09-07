import { PERMISSION_MODULES } from '../../data/modules'

/**
 * Controlled checkbox grid grouped by sidebar section, with a "select all"
 * toggle per section. Used when creating or editing a role.
 */
export default function PermissionMatrix({ permissions, onChange }) {
  const setSection = (moduleKeys, value) => {
    moduleKeys.forEach((key) => onChange(key, value))
  }

  return (
    <div className="space-y-4">
      {PERMISSION_MODULES.map((section) => {
        const keys = section.modules.map((m) => m.key)
        const allOn = keys.every((k) => permissions[k])
        const someOn = keys.some((k) => permissions[k])

        return (
          <div key={section.section} className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                {section.section}
              </span>
              <button
                type="button"
                onClick={() => setSection(keys, !allOn)}
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                {allOn ? 'Clear all' : 'Select all'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 p-3">
              {section.modules.map((m) => (
                <label
                  key={m.key}
                  className="flex items-center gap-2.5 py-1.5 px-1 rounded-md hover:bg-slate-50 cursor-pointer text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={!!permissions[m.key]}
                    onChange={(e) => onChange(m.key, e.target.checked)}
                    className="w-4 h-4 accent-brand-500 shrink-0"
                  />
                  {m.label}
                </label>
              ))}
            </div>
            {someOn && !allOn && (
              <div className="h-1 bg-brand-100">
                <div
                  className="h-full bg-brand-400"
                  style={{ width: `${(keys.filter((k) => permissions[k]).length / keys.length) * 100}%` }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
