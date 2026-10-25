// features/sensores/catalogo.js
// CATÁLOGO de dispositivos que podem ser adicionados a uma sessão.
// É só dado: a tela de escolha (SensorPicker) lê esta lista, então para oferecer
// um sensor novo basta adicionar UMA linha aqui (e, se quiser, o ícone em
// components/devices/iconesSensores.js).
//
//   tipo       identificador único (vai para o backend)
//   label      nome mostrado ao usuário e usado para numerar ("Sensor de umidade 01")
//   categoria  chave de CATEGORIAS: agrupa a lista de escolha

export const CATEGORIAS = {
  sensor: 'Sensores',
  atuador: 'Atuadores',
}

export const SENSORES = [
  { tipo: 'umidade',       label: 'Sensor de umidade',     categoria: 'sensor' },
  { tipo: 'temperatura',   label: 'Temperatura do solo',   categoria: 'sensor' },
  { tipo: 'pluviometro',   label: 'Pluviômetro',           categoria: 'sensor' },
  { tipo: 'radiacao',      label: 'Radiação solar',        categoria: 'sensor' },
  { tipo: 'irrigador',     label: 'Irrigador',             categoria: 'atuador' },
]

export const rotuloSensor = (tipo, catalogo = SENSORES) =>
  catalogo.find((s) => s.tipo === tipo)?.label ?? 'Dispositivo'
