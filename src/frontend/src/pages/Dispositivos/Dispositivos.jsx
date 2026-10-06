// pages/Dispositivos/Dispositivos.jsx
import { useMemo } from 'react'
import Accordion from '../../components/ui/Accordion.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Button from '../../components/ui/Button.jsx'
import DeviceItem from '../../components/devices/DeviceItem.jsx'
import useAsync from '../../hooks/useAsync'
import { listarDispositivos } from '../../features/device/devicesService.js'

export default function Dispositivos() {
  const { status, data, recarregar } = useAsync(listarDispositivos)

  // { Horta: [...], Soja: [...] }
  const porArea = useMemo(() => {
    const grupos = {}
    for (const d of data ?? []) (grupos[d.area] ??= []).push(d)
    return Object.entries(grupos)
  }, [data])

  if (status === 'loading') return <p className="text-body" role="status">Carregando dispositivos...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button variant="highlight" onClick={recarregar}>Tentar de novo</Button>}
      />
    )
  }

  if (porArea.length === 0) {
    return <EmptyState title="Nenhum dispositivo disponível" text="Adicione um dispositivo para vê-lo aqui." />
  }

  return (
    <>
      <h1 className="sr-only">Dispositivos</h1>
      <div className="accordion-list">
        {porArea.map(([area, itens], i) => (
          <Accordion
            key={area}
            title={area}
            meta={`${itens.filter((d) => d.online).length} de ${itens.length} online`}
            defaultOpen={i === 0}
          >
            <ul className="device-list">
              {itens.map((d) => <DeviceItem key={d.id} {...d} />)}
            </ul>
          </Accordion>
        ))}
      </div>
    </>
  )
}
