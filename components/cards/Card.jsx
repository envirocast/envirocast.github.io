// components/cards/Card.jsx
export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-6 shadow-xl bg-slate-900 border border-slate-700 ${className}`}>
      {children}
    </div>
  )
}
