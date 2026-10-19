// features/areas/areasService.js
// FONTE ÚNICA das áreas. "Sessão" (tela Dispositivos) e "área" (tela Painel) são a mesma
// coisa: as duas telas leem e criam por aqui, por isso ficam sincronizadas.
// Mesmo formato { ok, message, data } da API PHP. Para trocar, mude só o corpo.
import { criarStore } from '../mock/store'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const store = criarStore('areas:v1', [
  { id: 1, nome: 'Horta', cultura: 'Hortaliças', hectares: 0.5 },
  { id: 2, nome: 'Soja',  cultura: 'Soja',       hectares: 12 },
  { id: 3, nome: 'Café',  cultura: 'Café',       hectares: 4 },
])

export async function listarAreas() {
  await wait(150)
  return { ok: true, message: '', data: [...store.ler()] }
}

export async function criarArea({ nome, cultura, hectares }) {
  await wait(300)
  const limpo = nome?.trim()
  if (!limpo) return { ok: false, message: 'Informe um nome.', data: null }

  const areas = store.ler()
  if (areas.some((a) => a.nome.toLowerCase() === limpo.toLowerCase())) {
    return { ok: false, message: 'Esse nome já está em uso.', data: null }
  }

  const nova = {
    id: Math.max(0, ...areas.map((a) => a.id)) + 1,
    nome: limpo,
    cultura,
    hectares: Number(hectares) || 0,
  }
  store.salvar([...areas, nova])
  return { ok: true, message: '', data: nova }
}
