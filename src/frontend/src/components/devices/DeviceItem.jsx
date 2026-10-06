// components/devices/DeviceItem.jsx
import { Configuracao, Precipitacao, Umidade } from '../../assets/Icons'

/* Constante limite para definir estado de bateria fraca */
const BATERIA_BAIXA = 20

/* Mapeamento dos tipos de dispositivo para seus respectivos ícones SVG */
const ICONES = { sensor: Umidade, valvula: Precipitacao }

/* Componente funcional para renderizar um item individual de dispositivo na lista */
export default function DeviceItem({ nome, tipo, bateria, online }) {
  /* Verifica se o nível de bateria atual é menor ou igual ao limite de bateria baixa */
  const baixa = bateria <= BATERIA_BAIXA

  /* Seleciona o ícone correspondente ao tipo de dispositivo ou utiliza o ícone de Configuração como padrão */
  const Icone = ICONES[tipo] ?? Configuracao

  return (
    <li className="device">
      {/* Ícone representativo do tipo do dispositivo */}
      <span className="device__icon" aria-hidden="true">
        <Icone />
      </span>

      {/* Informações principais: nome e status de conexão (Online/Offline) */}
      <div className="device__info">
        <p className="device__name text-body">{nome}</p>
        <p className="device__status text-caption">
          <span className={`device__dot ${online ? 'is-online' : 'is-offline'}`} aria-hidden="true" />
          {online ? 'Online' : 'Offline'}
        </p>
      </div>

      {/* Indicador visual e percentual da carga da bateria */}
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