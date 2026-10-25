// features/painel/painelService.js
// As áreas vêm da mesma fonte da tela Dispositivos (listarSessoes), então as duas
// sempre mostram as mesmas sessões. Clima e irrigação seguem mockados.
import { listarSessoes } from '../device/devicesService'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function obterPainel() {
  await wait(250)

  const sessoes = await listarSessoes()
  if (!sessoes.ok) return sessoes

  const todos = sessoes.data.flatMap((s) => s.dispositivos)

  return {
    ok: true,
    message: '',
    data: {
      clima: {
        cidade: 'Mauá - SP',
        temperatura: 29,
        radiacao: 1000,        // W/m²
        umidade: 40,           // %
        dpv: 0.4,              // kPa
      },
      irrigacao: { minutosUsados: 150, minutosMeta: 450 },
      dispositivos: { ativos: todos.filter((d) => d.online).length, total: todos.length },
      areas: sessoes.data.map(({ dispositivos, ...area }) => ({ ...area, dispositivos: dispositivos.length })),
    },
  }
}
