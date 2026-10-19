// features/mock/store.js
// Armazenamento falso para os services mock. Guarda em memória e no localStorage,
// então Painel e Dispositivos enxergam os mesmos dados (e eles sobrevivem ao F5).
// Para zerar os dados de teste: apague as chaves "agrofacil:mock:*" no navegador.
// Quando existir API real, este arquivo deixa de ser usado.
export function criarStore(chave, inicial) {
  const KEY = `agrofacil:mock:${chave}`
  let cache = null

  function ler() {
    if (cache) return cache
    try {
      const salvo = localStorage.getItem(KEY)
      if (salvo) {
        cache = JSON.parse(salvo)
        return cache
      }
    } catch {
      // sem localStorage ou JSON inválido: recomeça do valor inicial
    }
    cache = structuredClone(inicial)
    return cache
  }

  function salvar(valor) {
    cache = valor
    try {
      localStorage.setItem(KEY, JSON.stringify(valor))
    } catch {
      // sem persistência, os dados valem só nesta sessão
    }
    return valor
  }

  return { ler, salvar }
}
