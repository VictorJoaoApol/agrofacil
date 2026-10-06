// components/ui/ThemeSwitch.jsx
import { useTheme } from '../../features/theme/ThemeContext'

/* Componente com acessibilidade role="switch" para alternar entre o modo claro e o modo escuro */
export default function ThemeSwitch() {
  /* Consome o estado do tema e o método de alternância do contexto de temas */
  const { tema, alternar } = useTheme()
  const escuro = tema === 'dark'

  return (
    <button type="button" role="switch" aria-checked={escuro}
      className="switch-row" onClick={alternar}>
      <span className="text-body">Modo escuro</span>
      {/* Indicador visual estilizado da chave de alternância */}
      <span className="switch" aria-hidden="true"><span className="switch__thumb" /></span>
    </button>
  )
}