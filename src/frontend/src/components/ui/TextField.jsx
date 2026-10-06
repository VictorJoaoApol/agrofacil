// components/ui/TextField.jsx
import { useId, useState } from 'react'

/* Componente genérico de entrada de texto com suporte a acessibilidade, mensagens de erro e alternância de visibilidade para senhas */
export default function TextField({ label, error, type = 'text', ...props }) {
  /* Gera identificador único para vincular a label ao input e associar a mensagem de erro via aria-describedby */
  const id = useId()
  
  /* Estado de visibilidade do campo caso o tipo seja senha */
  const [visible, setVisible] = useState(false)
  
  /* Flag para verificar se o tipo original do input é de senha */
  const isPassword = type === 'password'

  return (
    <div className="field">
      {/* Rótulo descritivo do campo */}
      <label htmlFor={id} className="field__label text-body">{label}</label>

      <div className="field__control">
        {/* Campo de entrada de texto com alternância dinâmica de tipo entre 'password' e 'text' */}
        <input
          id={id}
          className={`field__input text-body ${isPassword ? 'field__input--password' : ''}`}
          type={isPassword && visible ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-erro` : undefined}
          {...props}
        />
        
        {/* Botão para exibir ou ocultar a senha (renderizado apenas quando o tipo do input for senha) */}
        {isPassword && (
          <button
            type="button"
            className="field__toggle text-caption"
            onClick={() => setVisible((v) => !v)}
            aria-pressed={visible}
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>

      {/* Exibição condicional da mensagem de erro acessível */}
      {error && <p id={`${id}-erro`} className="field__error text-caption" role="alert">{error}</p>}
    </div>
  )
}