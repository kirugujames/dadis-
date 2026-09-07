import Modal from '../ui/Modal'
import Button from '../ui/Button'

/**
 * Wraps Modal with a <form> and standard Cancel/Submit footer, so every
 * "Add X" flow in the app (Add Landlord, Log Expense, New Project…) is a
 * few lines: pass fields as children, handle submit, done.
 */
export default function FormModal({ open, onClose, title, description, onSubmit, submitLabel = 'Save', size, children }) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size={size}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(e)
        }}
        className="space-y-4"
      >
        {children}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Modal>
  )
}
