// components/devices/SensorPicker.jsx
// Escolha de sensores a partir de um catálogo. Não conhece nenhuma tela: recebe o
// catálogo e o valor atual e devolve o novo valor.
//
//   value:    { [tipo]: quantidade }   ex.: { umidade: 2, irrigador: 1 }
//   onChange: (novoValue) => void
//   catalogo: lista de { tipo, label, categoria }  (padrão: features/sensores/catalogo.js)
//   max:      quantidade máxima por tipo
import { CATEGORIAS, SENSORES } from '../../features/sensores/catalogo'
import { iconeDoSensor } from './iconesSensores'

function agrupar(catalogo) {
  return Object.keys(CATEGORIAS)
    .map((categoria) => [categoria, catalogo.filter((s) => (s.categoria ?? 'sensor') === categoria)])
    .filter(([, itens]) => itens.length > 0)
}

export default function SensorPicker({ value, onChange, catalogo = SENSORES, max = 10, legend = 'Escolha os sensores' }) {
  function definir(tipo, quantidade) {
    const proximo = { ...value }
    if (quantidade <= 0) delete proximo[tipo]
    else proximo[tipo] = Math.min(quantidade, max)
    onChange(proximo)
  }

  return (
    <fieldset className="sensor-picker">
      <legend className="text-body">{legend}</legend>

      {agrupar(catalogo).map(([categoria, itens]) => (
        <div key={categoria} role="group" aria-label={CATEGORIAS[categoria]}>
          <p className="sensor-picker__grupo text-caption">{CATEGORIAS[categoria]}</p>

          <ul className="sensor-picker__lista">
            {itens.map(({ tipo, label }) => {
              const quantidade = value[tipo] ?? 0
              const Icone = iconeDoSensor(tipo)

              return (
                <li key={tipo} className={`sensor-opcao ${quantidade > 0 ? 'is-ativo' : ''}`}>
                  <label className="sensor-opcao__label">
                    <span className="sensor-opcao__tile" aria-hidden="true">
                      <Icone size={52} className="sensor-opcao__icone" />
                    </span>
                    <span className="sensor-opcao__nome text-body">{label}</span>
                    <input
                      type="checkbox"
                      className="circulo"
                      checked={quantidade > 0}
                      onChange={(e) => definir(tipo, e.target.checked ? 1 : 0)}
                    />
                  </label>

                  {quantidade > 0 && (
                    <div className="stepper" role="group" aria-label={`Quantidade de ${label}`}>
                      <button type="button" aria-label="Diminuir" onClick={() => definir(tipo, quantidade - 1)}>−</button>
                      <output aria-live="polite">{quantidade}</output>
                      <button type="button" aria-label="Aumentar" onClick={() => definir(tipo, quantidade + 1)} disabled={quantidade >= max}>+</button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </fieldset>
  )
}
