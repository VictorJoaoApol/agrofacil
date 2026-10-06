// components/devices/DeviceItem.jsx
import { Configuracao, Precipitacao, Umidade } from '../../assets/Icons'

const BATERIA_BAIXA = 20
const ICONES = { sensor: Umidade, valvula: Precipitacao }

export default function DeviceItem({ nome, tipo, bateria, online }) {
  const baixa = bateria <= BATERIA_BAIXA
  const Icone = ICONES[tipo] ?? Configuracao

  return (
    <li className="device">
      <span className="device__icon" aria-hidden="true">
        <Icone />
      </span>

      <div className="device__info">
        <p className="device__name text-body">{nome}</p>
        <p className="device__status text-caption">
          <span className={`device__dot ${online ? 'is-online' : 'is-offline'}`} aria-hidden="true" />
          {online ? 'Online' : 'Offline'}
        </p>
      </div>

      <div className="device__battery" role="img"
        aria-label={`Bateria ${bateria}%${baixa ? ', baixa' : ''}`}>
        <span className="device__bar">
          <span className={`device__fill ${baixa ? 'is-low' : ''}`} style={{ width: `${bateria}%` }} />
        </span>
        <span className="text-caption">{bateria}%</span>
      </div>
    </li>
  )
}
