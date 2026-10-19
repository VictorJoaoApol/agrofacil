// features/device/devicesService.js
// Dispositivos pertencem a uma área (areaId). Uma "sessão" é a área + seus dispositivos:
//   { id, nome, cultura, hectares, dispositivos: [{ id, nome, tipo, bateria, online }] }
// Mesmo formato { ok, message, data } da API PHP. Para trocar, mude só o corpo.
import { criarStore } from '../mock/store'
import { criarArea, listarAreas } from '../areas/areasService'
import { rotuloSensor } from '../sensores/catalogo'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const store = criarStore('dispositivos:v1', [
  { id: 1, areaId: 1, tipo: 'umidade',     nome: 'Sensor de umidade 01',   bateria: 82, online: true },
  { id: 2, areaId: 1, tipo: 'irrigador',   nome: 'Irrigador 01',           bateria: 15, online: true },
  { id: 3, areaId: 2, tipo: 'umidade',     nome: 'Sensor de umidade 01',   bateria: 47, online: false },
  { id: 4, areaId: 2, tipo: 'irrigador',   nome: 'Irrigador 01',           bateria: 90, online: true },
  { id: 5, areaId: 2, tipo: 'temperatura', nome: 'Temperatura do solo 01', bateria: 64, online: true },
])

const sessaoDe = (area, dispositivos) => ({
  ...area,
  dispositivos: dispositivos.filter((d) => d.areaId === area.id),
})

// sensores: [{ tipo, quantidade }] -> dispositivos novos, numerados por tipo dentro da área
function gerarDispositivos(areaId, existentes, sensores) {
  let proximoId = Math.max(0, ...existentes.map((d) => d.id)) + 1
  const novos = []

  for (const { tipo, quantidade } of sensores) {
    const jaNaArea = existentes.filter((d) => d.areaId === areaId && d.tipo === tipo).length
    for (let i = 1; i <= (Number(quantidade) || 0); i++) {
      novos.push({
        id: proximoId++,
        areaId,
        tipo,
        nome: `${rotuloSensor(tipo)} ${String(jaNaArea + i).padStart(2, '0')}`,
        bateria: 100,
        online: true,
      })
    }
  }
  return novos
}

// Todas as sessões (inclusive as sem dispositivos), na mesma ordem das áreas do Painel.
export async function listarSessoes() {
  const res = await listarAreas()
  if (!res.ok) return res
  const dispositivos = store.ler()
  return { ok: true, message: '', data: res.data.map((area) => sessaoDe(area, dispositivos)) }
}

// Cria a área (a mesma que aparece no Painel) e já vincula os sensores escolhidos.
export async function criarSessao({ nome, cultura, hectares, sensores = [] }) {
  const res = await criarArea({ nome, cultura, hectares })
  if (!res.ok) return res

  const novos = gerarDispositivos(res.data.id, store.ler(), sensores)
  if (novos.length > 0) store.salvar([...store.ler(), ...novos])

  return { ok: true, message: '', data: sessaoDe(res.data, store.ler()) }
}

// Adiciona sensores a uma sessão que já existe. Devolve a sessão atualizada.
export async function adicionarDispositivos(areaId, sensores = []) {
  await wait(300)

  const areas = await listarAreas()
  const area = areas.data?.find((a) => a.id === areaId)
  if (!area) return { ok: false, message: 'Sessão não encontrada.', data: null }

  const novos = gerarDispositivos(areaId, store.ler(), sensores)
  if (novos.length === 0) return { ok: false, message: 'Escolha pelo menos um sensor.', data: null }

  store.salvar([...store.ler(), ...novos])
  return { ok: true, message: '', data: sessaoDe(area, store.ler()) }
}
