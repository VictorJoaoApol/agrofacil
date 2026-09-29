// features/painel/painelService.js
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

let areas = [
  { id: 1, nome: 'Horta', cultura: 'Hortaliças', hectares: 0.5 },
  { id: 2, nome: 'Soja',  cultura: 'Soja',       hectares: 12 },
  { id: 3, nome: 'Café',  cultura: 'Café',       hectares: 4 },
]

export async function obterPainel() {
  await wait(400)
  return {
    ok: true, message: '',
    data: {
      agua:  { usadoLitros: 1240, metaLitros: 2000 },
      clima: { temperatura: 26, umidade: 61, chuvaPct: 20 },
      areas: [...areas],
    },
  }
}

export async function criarArea({ nome, cultura, hectares }) {
  await wait(300)
  if (!nome?.trim()) return { ok: false, message: 'Informe o nome da área.', data: null }
  if (areas.some((a) => a.nome.toLowerCase() === nome.trim().toLowerCase()))
    return { ok: false, message: 'Já existe uma área com esse nome.', data: null }

  const nova = { id: Date.now(), nome: nome.trim(), cultura, hectares: Number(hectares) || 0 }
  areas = [...areas, nova]
  return { ok: true, message: '', data: nova }
}