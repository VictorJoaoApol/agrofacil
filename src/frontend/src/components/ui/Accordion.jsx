// components/ui/Accordion.jsx
import { useId, useState } from 'react'

// headingLevel: nível do título (2 por padrão; use 3 dentro de uma seção que já tem h2)

/* Componente genérico de sanfona/expansível (Accordion) reutilizável com suporte à acessibilidade */
export default function Accordion({ title, meta, defaultOpen = false, headingLevel = 2, children }) {
  /* Gera IDs únicos para vincular o botão de acionamento ao painel de conteúdo via ARIA */
  const id = useId()
  const [open, setOpen] = useState(defaultOpen)
  
  /* Define dinamicamente a tag de cabeçalho (h1, h2, h3, etc.) baseada na prop headingLevel */
  const Heading = `h${headingLevel}`

  return (
    <section className={`accordion ${open ? 'is-open' : ''}`}>
      {/* Cabeçalho dinâmico para estruturação semântica e hierarquia da página */}
      <Heading>
        {/* Botão de alternância que controla a visibilidade do painel */}
        <button
          type="button"
          className="accordion__trigger"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-title-s">{title}</span>
          {/* Informação adicional/metadado opcional exibido no cabeçalho */}
          {meta && <span className="accordion__meta text-caption">{meta}</span>}
          {/* Ícone de seta indicativo do estado de abertura */}
          <svg className="accordion__chevron" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </Heading>

      {/* Painel expansível contendo os elementos filhos do accordion */}
      <div className="accordion__panel" id={`${id}-panel`} role="region"
        aria-labelledby={`${id}-trigger`} inert={!open}>
        <div className="accordion__inner">{children}</div>
      </div>
    </section>
  )
}