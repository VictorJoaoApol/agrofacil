// pages/Painel/Painel.jsx
import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import NovaAreaModal from '../../components/painel/NovaArealModal.jsx'
import { obterPainel } from '../../features/painel/painelService'

export default function Painel() {
  const [status, setStatus] = useState('loading')   // loading | ready | error
  const [painel, setPainel] = useState(null)
  const [novaArea, setNovaArea] = useState(false)

  const carregar = () => {
    setStatus('loading')
    obterPainel()
      .then((res) => {
        if (!res.ok) throw new Error(res.message)
        setPainel(res.data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(carregar, [])

  if (status === 'loading') return <p className="text-body" role="status">Carregando painel...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button onClick={carregar}>Tentar de novo</Button>}
      />
    )
  }

  const { agua, clima, areas } = painel
  const pct = Math.min(100, Math.round((agua.usadoLitros / agua.metaLitros) * 100))

  return (
    <>
      <h1 className="text-title-l painel__titulo">Painel</h1>

      <section className="painel-card painel-card--blue" aria-labelledby="agua-titulo">
        <h2 id="agua-titulo" className="text-title-s">Uso de água</h2>
        <p className="text-body">{agua.usadoLitros} L de {agua.metaLitros} L</p>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={pct} aria-label="Uso de água no mês">
          <span className="meter__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-caption">{pct}% da meta</p>
      </section>

      <section className="painel-card painel-card--green" aria-labelledby="clima-titulo">
        <h2 id="clima-titulo" className="text-title-s">Clima</h2>
        <ul className="clima">
          <li><strong className="text-title-m">{clima.temperatura}°C</strong><span className="text-caption">Temperatura</span></li>
          <li><strong className="text-title-m">{clima.umidade}%</strong><span className="text-caption">Umidade</span></li>
          <li><strong className="text-title-m">{clima.chuvaPct}%</strong><span className="text-caption">Chuva</span></li>
        </ul>
      </section>

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

      <NovaAreaModal
        open={novaArea}
        onClose={() => setNovaArea(false)}
        onCriada={(a) => setPainel((p) => ({ ...p, areas: [...p.areas, a] }))}
      />
    </>
  )
}