import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, tone = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] space-y-2 w-full max-w-xs">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast-in flex items-start gap-2.5 bg-white border border-slate-100 shadow-lg rounded-xl px-4 py-3"
          >
            {t.tone === 'success' ? (
              <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
            ) : (
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
            )}
            <p className="text-sm text-slate-700 flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-slate-300 hover:text-slate-500 shrink-0">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
