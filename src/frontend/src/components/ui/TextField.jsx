// components/ui/TextField.jsx
import { useId, useState } from 'react'

export default function TextField({ label, error, type = 'text', ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="field">
      <label htmlFor={id} className="field__label text-body">{label}</label>

      <div className="field__control">
        <input
          id={id}
          className={`field__input text-body ${isPassword ? 'field__input--password' : ''}`}
          type={isPassword && visible ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-erro` : undefined}
          {...props}
        />
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

      {error && <p id={`${id}-erro`} className="field__error text-caption" role="alert">{error}</p>}
    </div>
  )
}
