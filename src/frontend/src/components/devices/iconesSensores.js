// components/devices/iconesSensores.js
// tipo do catálogo -> ícone. Sem ícone próprio, usa o genérico.
// TODO: exportar do Figma os SVGs de temperatura, condutividade e irrigador.
import { Configuracao, Precipitacao, Radiacao, Umidade } from '../../assets/Icons'

const ICONES = {
  umidade: Umidade,
  pluviometro: Precipitacao,
  irrigador: Precipitacao,
  radiacao: Radiacao,
}

export const iconeDoSensor = (tipo) => ICONES[tipo] ?? Configuracao
