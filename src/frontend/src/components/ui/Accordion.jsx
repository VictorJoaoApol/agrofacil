// components/ui/Accordion.jsx
import { useId, useState } from 'react'

// headingLevel: nível do título (2 por padrão; use 3 dentro de uma seção que já tem h2)
export default function Accordion({ title, meta, defaultOpen = false, headingLevel = 2, children }) {
  const id = useId()
  const [open, setOpen] = useState(defaultOpen)
  const Heading = `h${headingLevel}`

  return (
    <section className={`accordion ${open ? 'is-open' : ''}`}>
      <Heading>
        <button
          type="button"
          className="accordion__trigger"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-title-s">{title}</span>
          {meta && <span className="accordion__meta text-caption">{meta}</span>}
          <svg className="accordion__chevron" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </Heading>

      <div className="accordion__panel" id={`${id}-panel`} role="region"
        aria-labelledby={`${id}-trigger`} inert={!open}>
        <div className="accordion__inner">{children}</div>
      </div>
    </section>
  )
}
