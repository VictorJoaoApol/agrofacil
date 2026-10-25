// components/ui/SwitchRow.jsx
/* Linha com chave liga/desliga (role="switch"), com ícone opcional à esquerda */
export default function SwitchRow({ label, icone: Icone, checked, onChange, cor = 'verde' }) {
  return (
    <button type="button" role="switch" aria-checked={checked}
      className={`switch-row switch-row--${cor}`} onClick={onChange}>
      {Icone && <Icone size={24} className="switch-row__icone" aria-hidden="true" />}
      <span className="text-body switch-row__texto">{label}</span>
      {/* Indicador visual estilizado da chave */}
      <span className="switch" aria-hidden="true"><span className="switch__thumb" /></span>
    </button>
  )
}
