// pages/Dispositivos/Dispositivos.jsx
import { useEffect, useMemo, useState } from 'react'
import Accordion from '../../components/ui/Accordion.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Button from '../../components/ui/Button.jsx'
import DeviceItem from '../../components/devices/DeviceItem.jsx'
import { listarDispositivos } from '../../features/device/devicesService.js'

export default function Dispositivos() {
  const [status, setStatus] = useState('loading')   // loading | ready | error
  const [dispositivos, setDispositivos] = useState([])

  const carregar = () => {
    setStatus('loading')
    listarDispositivos()
      .then((res) => {
        if (!res.ok) throw new Error(res.message)
        setDispositivos(res.data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(carregar, [])

  // { Horta: [...], Soja: [...] }
  const porArea = useMemo(() => {
    const grupos = {}
    for (const d of dispositivos) (grupos[d.area] ??= []).push(d)
    return Object.entries(grupos)
  }, [dispositivos])

  if (status === 'loading') return <p className="text-body" role="status">Carregando dispositivos...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button variant="secondary" onClick={carregar}>Tentar de novo</Button>}
      />
    )
  }

  if (porArea.length === 0) {
    return <EmptyState title="Nenhum dispositivo disponível" text="Adicione um dispositivo para vê-lo aqui." />
  }

  return (
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
  )
}