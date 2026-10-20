// pages/Painel/AreasIrrigacao.jsx
// As áreas são as mesmas sessões da tela Dispositivos (features/areas).
import { useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import SessaoModal from '../../components/devices/SessaoModal.jsx'
import useAsync from '../../hooks/useAsync'
import { criarArea } from '../../features/areas/areasService'
import { obterPainel } from '../../features/painel/painelService'
import { appPath } from '../../routes/pages'
import { DispositivosAtivado, Extensao } from '../../assets/Icons/index.jsx'

const plural = (n) => `${n} ${n === 1 ? 'dispositivo' : 'dispositivos'}`

export default function AreasIrrigacao() {
  const { status, data: painel, recarregar, setData } = useAsync(obterPainel)
  const [novaArea, setNovaArea] = useState(false)

  if (status === 'loading') return <p className="text-body" role="status">Carregando áreas...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button onClick={recarregar}>Tentar de novo</Button>}
      />
    )
  }

  const { areas } = painel

  return (
    <>
      <div className="subpagina__voltar">
        <Button variant="link" to={appPath('painel')}>← Voltar ao painel</Button>
      </div>

      <div className="painel__areas-head">
        <h1 className="text-title-m">Áreas de Irrigação</h1>
        <Button variant="highlight" onClick={() => setNovaArea(true)}>Nova área</Button>
      </div>

      {areas.length === 0
        ? <EmptyState title="Nenhuma área cadastrada" text="Crie sua primeira área para começar." />
        : (
          <ul className="area-list">
            {areas.map((a) => (
              <li key={a.id} className="area">
                <p className="text-body painel-titulo">{a.nome}<p className='painel-titulo id'>#{a.id}</p></p>
                <p className="text-caption area__meta">{a.cultura}</p>
                <p className="text-caption area__meta"><DispositivosAtivado size={16} aria-hidden="true" />{plural(a.dispositivos)}</p>
                <p className="text-caption area__meta"><Extensao size={16} aria-hidden="true" />{a.hectares} ha</p>
              </li>
            ))}
          </ul>
        )}

      <SessaoModal
        open={novaArea}
        onClose={() => setNovaArea(false)}
        titulo="Monte seu projeto"
        termo="área"
        passos={['nome', 'cultura', 'confirmar']}
        salvar={criarArea}
        onSalvo={(area) => setData((p) => ({ ...p, areas: [...p.areas, { ...area, dispositivos: 0 }] }))}
      />
    </>
  )
}
