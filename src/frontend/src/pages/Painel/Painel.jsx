// pages/Painel/Painel.jsx
import { Link } from 'react-router'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { Radiacao, Seta, Umidade, Ensolarado } from '../../assets/Icons'
import useAsync from '../../hooks/useAsync'
import { obterPainel } from '../../features/painel/painelService'
import { appPath } from '../../routes/pages'
import logo from '../../assets/img/Logo.png'

/* 150 -> "2h30min" */
const formatarTempo = (min) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h${String(m).padStart(2, '0')}min`
}

/* Anel de progresso (SVG) do tempo de irrigação */
function Anel({ pct }) {
  const r = 70
  const c = 2 * Math.PI * r
  return (
    <svg className="svg-original irrig__anel" viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r={r} fill="none" stroke="rgb(255 255 255 / .25)" strokeWidth="10" />
      <circle cx="80" cy="80" r={r} fill="none" stroke="var(--blue)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`} transform="rotate(-90 80 80)" />
    </svg>
  )
}

/* Painel: clima, tempo de irrigação, dispositivos IoT e atalho para as áreas */
export default function Painel() {
  const { status, data: painel, recarregar } = useAsync(obterPainel)

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

  const { clima, irrigacao, dispositivos } = painel
  const pct = Math.min(100, Math.round((irrigacao.minutosUsados / irrigacao.minutosMeta) * 100))

  return (
    <>
      <header className="painel-topo">
        <img className="painel-topo__logo" src={logo} alt="" />
        <h1 className="text-title-l">Painel</h1>
        <p className="text-body">Dados sobre sua terra</p>
      </header>

      <div className="painel-resumo">
        {/* Clima */}
        <section className="painel-clima" aria-labelledby="clima-titulo">
          <h2 id="clima-titulo" className="sr-only">Clima</h2>
          <div className="painel-clima__topo">
            <Ensolarado size={72} className="painel-clima__sol" aria-hidden="true" />
            <div>
              <p className="painel-clima__temp">{clima.temperatura}°</p>
              <p className="text-caption">{clima.cidade}</p>
            </div>
          </div>
          <ul className="painel-clima__dados">
            <li>
              <Radiacao size={20} aria-hidden="true" />
              <span><small>Radiação Solar</small><strong>{clima.radiacao}W/m²</strong></span>
            </li>
            <li>
              <Umidade size={20} aria-hidden="true" />
              <span><small>Umidade e DPV</small><strong>{clima.umidade}% | {String(clima.dpv).replace('.', ',')}kPa</strong></span>
            </li>
          </ul>
        </section>

        {/* Irrigação */}
        <section className="painel-irrig" aria-labelledby="irrig-titulo">
          <h2 id="irrig-titulo" className="sr-only">Tempo de irrigação</h2>
          <Anel pct={pct} />
          <div className="painel-irrig__centro" role="img"
            aria-label={`${formatarTempo(irrigacao.minutosUsados)} de ${formatarTempo(irrigacao.minutosMeta)}, ${pct}%`}>
            <p className="text-caption">Tempo<br></br> total de Irrigação</p>
            <p className="painel-irrig__tempo">{formatarTempo(irrigacao.minutosUsados)}</p>
            <p className="text-caption">De {formatarTempo(irrigacao.minutosMeta)}<br />{pct}%</p>
          </div>
        </section>
      </div>

      {/* Dispositivos IoT */}
      <Link to={appPath('dispositivos')} className="painel-iot">
        <div className="painel-iot__texto">
          <h2 className="painel-iot__titulo">Dispositivos IoT</h2>
          <p className="painel-iot__ativos">{dispositivos.ativos}/{dispositivos.total}</p>
          <p className="text-body">Dispositivos ativos</p>
        </div>
        <span className="painel-iot__ir" aria-hidden="true"><Seta size={28} /></span>
      </Link>

      <div className="painel-areas-link">
        <Button variant="primary" to={appPath('painel/areas')}>Áreas de Irrigação</Button>
      </div>
    </>
  )
}
