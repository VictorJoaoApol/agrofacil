// pages/Painel/Painel.jsx
import { useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import NovaAreaModal from '../../components/painel/NovaAreaModal.jsx'
import useAsync from '../../hooks/useAsync'
import { obterPainel } from '../../features/painel/painelService'

/* Dashboard principal com métricas de uso de água, condições do clima e áreas agrícolas */
export default function Painel() {
  /* Requisição dos dados do painel */
  const { status, data: painel, recarregar, setData } = useAsync(obterPainel)
  
  /* Estado de visibilidade do modal de cadastro de nova área */
  const [novaArea, setNovaArea] = useState(false)

  if (status === 'loading') return <p className="text-body" role="status">Carregando painel...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button onClick={recarregar}>Tentar de novo</Button>}
      />
    )
  }

  const { agua, clima, areas } = painel
  /* Calcula a porcentagem de consumo de água em relação à meta */
  const pct = Math.min(100, Math.round((agua.usadoLitros / agua.metaLitros) * 100))

  return (
    <>
      <h1 className="text-title-l painel__titulo">Painel</h1>

      {/* Card indicador de uso de água */}
      <section className="painel-card painel-card--blue" aria-labelledby="agua-titulo">
        <h2 id="agua-titulo" className="text-title-s">Uso de água</h2>
        <p className="text-body">{agua.usadoLitros} L de {agua.metaLitros} L</p>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={pct} aria-label="Uso de água no mês">
          <span className="meter__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-caption">{pct}% da meta</p>
      </section>

      {/* Card indicador de dados meteorológicos locais */}
      <section className="painel-card painel-card--green" aria-labelledby="clima-titulo">
        <h2 id="clima-titulo" className="text-title-s">Clima</h2>
        <ul className="clima">
          <li><strong className="text-title-s">{clima.temperatura}°C</strong><span className="text-caption">Temperatura</span></li>
          <li><strong className="text-title-s">{clima.umidade}%</strong><span className="text-caption">Umidade</span></li>
          <li><strong className="text-title-s">{clima.chuvaPct}%</strong><span className="text-caption">Chuva</span></li>
        </ul>
      </section>

      {/* Seção de gestão de áreas de irrigação */}
      <section aria-labelledby="areas-titulo">
        <div className="painel__areas-head">
          <h2 id="areas-titulo" className="text-title-s">Áreas de irrigação</h2>
          <Button variant="highlight" onClick={() => setNovaArea(true)}>Nova área</Button>
        </div>

        {areas.length === 0
          ? <EmptyState title="Nenhuma área cadastrada" text="Crie sua primeira área para começar." />
          : (
            <ul className="area-list">
              {areas.map((a) => (
                <li key={a.id} className="area">
                  <p className="text-body area__nome">{a.nome}</p>
                  <p className="text-caption area__meta">{a.cultura} · {a.hectares} ha</p>
                </li>
              ))}
            </ul>
          )}
      </section>

      {/* Modal de adição de uma nova área */}
      <NovaAreaModal
        open={novaArea}
        onClose={() => setNovaArea(false)}
        onCriada={(a) => setData((p) => ({ ...p, areas: [...p.areas, a] }))}
      />
    </>
  )
}