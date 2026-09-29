// components/ui/ThemeSwitch.jsx
import { useTheme } from '../../features/theme/ThemeContext'

export default function ThemeSwitch() {
  const { tema, alternar } = useTheme()
  const escuro = tema === 'dark'

  return (
    <button type="button" role="switch" aria-checked={escuro}
      className="switch-row" onClick={alternar}>
      <span className="text-body">Modo escuro</span>
      <span className="switch" aria-hidden="true"><span className="switch__thumb" /></span>
    </button>
  )
}