// pages/Perfil/Perfil.jsx
import { useState } from 'react'
import Avatar from '../../components/ui/Avatar.jsx'
import Button from '../../components/ui/Button.jsx'
import Modal from '../../components/ui/Modal.jsx'
import ThemeSwitch from '../../components/ui/ThemeSwitch.jsx'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'

/* Página de perfil e preferências do usuário com opção de alteração de tema e encerramento da sessão */
export default function Perfil() {
  /* Resgata os dados da conta do usuário logado */
  const { usuario } = useAuth()
  
  /* Manipuladores e estados de logout */
  const { sair, saindo, erro } = useLogout()
  
  /* Controle de exibição do modal de confirmação de logout */
  const [confirmando, setConfirmando] = useState(false)

  return (
    <>
      <header className="perfil-header">
        <Avatar nome={usuario?.nome} size={64} />
        <div>
          <h1 className="text-title-s">{usuario?.nome ?? 'Usuário'}</h1>
          <p className="text-body perfil-email">{usuario?.email}</p>
        </div>
      </header>

      {/* Seção de preferências do aplicativo */}
      <section className="perfil-lista" aria-label="Preferências">
        <ThemeSwitch />
      </section>

      <Button variant="highlight" onClick={() => setConfirmando(true)}>Sair</Button>

      {/* Modal de confirmação para efetuar logout */}
      <Modal open={confirmando} onClose={() => setConfirmando(false)} title="Deseja sair?">
        <p className="text-body">Você precisará entrar novamente para acessar sua conta.</p>
        {erro && <p role="alert" className="text-caption field__error">{erro}</p>}
        <div className="modal__actions">
          <Button variant="link" onClick={() => setConfirmando(false)}>Cancelar</Button>
          <Button onClick={sair} disabled={saindo}>{saindo ? 'Saindo...' : 'Sair'}</Button>
        </div>
      </Modal>
    </>
  )
}