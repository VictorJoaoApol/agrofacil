// features/tarefas/tarefasService.js

/* Função utilitária para simular o tempo de resposta (latência) da rede */
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/* Lista local de tarefas agrícolas registradas */
let tarefas = [
  { id: 1, titulo: 'Irrigar a horta',           area: 'Horta', concluida: true },
  { id: 2, titulo: 'Trocar bateria da válvula 01', area: 'Horta', concluida: false },
  { id: 3, titulo: 'Verificar sensor da soja',   area: 'Soja',  concluida: false },
  { id: 4, titulo: 'Colheita do café, lote 2',   area: 'Café',  concluida: false },
]

/* Retorna todas as tarefas registradas */
export async function listarTarefas() {
  await wait(400)
  return { ok: true, message: '', data: [...tarefas] }
}

/* Alterna o estado de conclusão (concluída/pendente) de uma tarefa específica */
export async function alternarTarefa(id) {
  await wait(150)
  const t = tarefas.find((x) => x.id === id)
  if (!t) return { ok: false, message: 'Tarefa não encontrada.', data: null }
  tarefas = tarefas.map((x) => (x.id === id ? { ...x, concluida: !x.concluida } : x))
  return { ok: true, message: '', data: tarefas.find((x) => x.id === id) }
}

/* Cria e adiciona uma nova tarefa no topo da lista */
export async function criarTarefa({ titulo, area }) {
  await wait(200)
  if (!titulo?.trim()) return { ok: false, message: 'Descreva a tarefa.', data: null }
  const nova = { id: Date.now(), titulo: titulo.trim(), area: area || 'Geral', concluida: false }
  tarefas = [nova, ...tarefas]
  return { ok: true, message: '', data: nova }
}