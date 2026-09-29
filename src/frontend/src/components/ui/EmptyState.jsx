// components/ui/EmptyState.jsx
export default function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      <p className="text-title-s">{title}</p>
      {text && <p className="text-body empty-state__text">{text}</p>}
      {action}
    </div>
  )
}