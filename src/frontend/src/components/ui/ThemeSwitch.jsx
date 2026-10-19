// components/ui/ThemeSwitch.jsx
import { useTheme } from '../../features/theme/ThemeContext'
import SwitchRow from './SwitchRow.jsx'

/* Alterna entre o modo claro e o escuro. `icone` é opcional (a Sidebar não usa) */
export default function ThemeSwitch({ icone, cor }) {
  const { tema, alternar } = useTheme()
  return <SwitchRow label="Modo escuro" icone={icone} cor={cor} checked={tema === 'dark'} onChange={alternar} />
}
