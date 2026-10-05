// pages/Perfil/Perfil.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../components/ui/Button.jsx'
import Modal from '../../components/ui/Modal.jsx'
import ThemeSwitch from '../../components/ui/ThemeSwitch.jsx'

export default function Perfil() {
  const navigate = useNavigate()
  const [confirmando, setConfirmando] = useState(false)
  const [saindo, setSaindo] = useState(false)

  const confirmarSaida = async () => {
    setSaindo(true)
    await sair()
    navigate('/login', { replace: true })   // replace: o botão voltar não retorna ao app
  }

  const inicial = (usuario?.nome ?? 'U').charAt(0).toUpperCase()

  return (
    <>
      <header className="perfil-header">
        <div className="avatar" aria-hidden="true">{inicial}</div>
        <div>
          <h1 className="text-title-m">{usuario?.nome ?? 'Usuário'}</h1>
          <p className="text-body perfil-email">{usuario?.email}</p>
        </div>
      </header>

      <section className="perfil-lista" aria-label="Preferências">
        <ThemeSwitch />
      </section>

      <Button variant="highlight" onClick={() => setConfirmando(true)}>Sair</Button>

      <Modal open={confirmando} onClose={() => setConfirmando(false)} title="Deseja sair?">
        <p className="text-body">Você precisará entrar novamente para acessar sua conta.</p>
        <div className="modal__actions">
          <Button variant="link" onClick={() => setConfirmando(false)}>Cancelar</Button>
          <Button onClick={confirmarSaida} disabled={saindo}>
            {saindo ? 'Saindo...' : 'Sair'}
          </Button>
        </div>
      </Modal>
    </>
  )
}