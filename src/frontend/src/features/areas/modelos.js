// features/areas/modelos.js
// MODELOS de sessão: pontos de partida, não regras. Ao escolher um modelo, a cultura e
// os sensores vêm pré-preenchidos, mas o usuário pode mudar tudo nos passos seguintes.
// Para oferecer um modelo novo, adicione um item em MODELOS_AREA.
//
//   sensores: lista de "tipo" do catálogo (features/sensores/catalogo.js)

export const CULTURAS = ['Hortaliças', 'Soja', 'Café', 'Milho', 'Outra']

export const MODELOS_AREA = [
  {
    id: 'personalizada',
    label: 'Personalizada',
    descricao: 'Comece do zero e escolha tudo.',
    cultura: '',
    sensores: [],
  },
  {
    id: 'horta',
    label: 'Horta',
    descricao: 'Umidade, temperatura e irrigador.',
    cultura: 'Hortaliças',
    sensores: ['umidade', 'temperatura', 'irrigador'],
  },
  {
    id: 'soja',
    label: 'Soja',
    descricao: 'Umidade e irrigador.',
    cultura: 'Soja',
    sensores: ['umidade', 'irrigador'],
  },
  {
    id: 'cafe',
    label: 'Café',
    descricao: 'Umidade, temperatura e irrigador.',
    cultura: 'Café',
    sensores: ['umidade', 'temperatura', 'irrigador'],
  },
]
