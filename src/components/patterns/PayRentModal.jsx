import { useState } from 'react'
import { Smartphone, CheckCircle2 } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Field, TextInput } from '../ui/Field'
import { tenantLease, formatKsh } from '../../data/mockData'

export default function PayRentModal({ open, onClose }) {
  const [phone, setPhone] = useState('+254 712 345 678')
  const [stage, setStage] = useState('form') // form | processing | success

  const handlePay = (e) => {
    e.preventDefault()
    setStage('processing')
    setTimeout(() => setStage('success'), 1400)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setStage('form'), 200)
  }

  return (
    <Modal open={open} onClose={handleClose} title="Pay Rent" description={`${tenantLease.property} · Unit ${tenantLease.unit}`}>
      {stage === 'form' && (
        <form onSubmit={handlePay} className="space-y-4">
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
            <span className="text-sm text-slate-500">Amount due</span>
            <span className="text-lg font-semibold text-slate-900">{formatKsh(tenantLease.rent)}</span>
          </div>
          <Field label="M-Pesa phone number">
            <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" />
          </Field>
          <Button type="submit" className="w-full" icon={Smartphone}>
            Send STK Push
          </Button>
        </form>
      )}

      {stage === 'processing' && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-10 h-10 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin mb-4" />
          <p className="text-sm font-medium text-slate-700">Check your phone for the M-Pesa prompt…</p>
          <p className="text-xs text-slate-400 mt-1">Enter your PIN to complete payment.</p>
        </div>
      )}

      {stage === 'success' && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 size={40} className="text-brand-500 mb-3" />
          <p className="text-sm font-semibold text-slate-800">Payment received</p>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            {formatKsh(tenantLease.rent)} has been applied to your account.
          </p>
          <Button variant="secondary" onClick={handleClose}>Done</Button>
        </div>
      )}
    </Modal>
  )
}
