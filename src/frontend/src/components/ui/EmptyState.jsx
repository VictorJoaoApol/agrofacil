// components/ui/EmptyState.jsx

/* Componente reutilizável para apresentação de telas/estados vazios ou sem dados */
export default function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      {/* Título principal do estado vazio */}
      <p className="text-title-s">{title}</p>
      
      {/* Descrição detalhada opcional */}
      {text && <p className="text-body empty-state__text">{text}</p>}
      
      {/* Slot flexível para inclusão de ações como botões ou links de recuperação */}
      {action}
    </div>
  )
}