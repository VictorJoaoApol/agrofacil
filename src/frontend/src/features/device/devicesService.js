// features/devices/devicesService.js
// Mesmo formato { ok, message, data } da API PHP. Para trocar, mude só o corpo.

/* Função utilitária para simular o tempo de resposta (latência) da rede */
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/* Lista simulada de dispositivos IoT cadastrados no sistema */
const MOCK = [
  { id: 1, nome: 'Sensor de umidade 01', area: 'Horta', tipo: 'sensor',  bateria: 82, online: true },
  { id: 2, nome: 'Válvula 01',            area: 'Horta', tipo: 'valvula', bateria: 15, online: true },
  { id: 3, nome: 'Sensor de umidade 02', area: 'Soja',  tipo: 'sensor',  bateria: 47, online: false },
  { id: 4, nome: 'Válvula 02',            area: 'Soja',  tipo: 'valvula', bateria: 90, online: true },
  { id: 5, nome: 'Sensor de temperatura', area: 'Soja', tipo: 'sensor',  bateria: 64, online: true },
]

/* Retorna a lista de todos os dispositivos monitorados */
export async function listarDispositivos() {
  await wait(400)
  return { ok: true, message: '', data: MOCK }
}