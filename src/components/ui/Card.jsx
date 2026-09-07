export default function Card({ children, className = '', padded = true, interactive = false }) {
  return (
    <div
      className={`bg-white rounded-xl2 border border-slate-200 shadow-card ${
        interactive ? 'transition-shadow hover:shadow-card-lg' : ''
      } ${padded ? 'p-5' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
