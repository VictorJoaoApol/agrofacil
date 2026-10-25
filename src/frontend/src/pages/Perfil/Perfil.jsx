// pages/Perfil/Perfil.jsx
import { useState } from 'react'
import { Link } from 'react-router'
import Avatar from '../../components/ui/Avatar.jsx'
import Modal from '../../components/ui/Modal.jsx'
import Button from '../../components/ui/Button.jsx'
import SwitchRow from '../../components/ui/SwitchRow.jsx'
import ThemeSwitch from '../../components/ui/ThemeSwitch.jsx'
import { Ajuda, Login, ModoEscuro, Notificacao, Ponto, Seta, Usuario } from '../../assets/Icons'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'
import useNotificacoes from '../../hooks/useNotificacoes'
import { appPath } from '../../routes/pages'

/* Linha de navegação: ícone + texto + seta, leva a outra página */
function LinhaLink({ to, icone: Icone, children }) {
  return (
    <Link to={to} className="perfil-linha">
      <Icone size={24} className="perfil-linha__icone" aria-hidden="true" />
      <span className="text-caption perfil-linha__texto">{children}</span>
      <Seta size={12} className="perfil-linha__seta" aria-hidden="true" />
    </Link>
  )
}

/* Perfil: foto, nome e três blocos (Conta, Aplicação, Sair). Cada link abre uma página própria */
export default function Perfil() {
  const { usuario } = useAuth()
  const { sair, saindo, erro } = useLogout()
  const { ativas, alternar } = useNotificacoes()
  const [confirmando, setConfirmando] = useState(false)

  return (
    <>
      <header className="perfil-topo">
        <Avatar nome={usuario?.nome} src={usuario?.foto} size={216} />
        <h1 className="text-title-m perfil-topo__nome">{usuario?.nome ?? 'Usuário'}</h1>
      </header>

      <div className="perfil-blocos">
        <section className="perfil-secao" aria-labelledby="perfil-conta">
          <h2 id="perfil-conta" className="perfil-secao__rotulo text-caption">Conta</h2>
          <LinhaLink to={appPath('perfil/informacoes')} icone={Usuario}>Informações do Usuário</LinhaLink>
        </section>

        <section className="perfil-secao" aria-labelledby="perfil-app">
          <h2 id="perfil-app" className="perfil-secao__rotulo text-caption">Aplicação</h2>
          <ThemeSwitch icone={ModoEscuro} cor="laranja" />
          <SwitchRow label="Notificações" icone={Notificacao} checked={ativas} onChange={alternar} />
          <LinhaLink to={appPath('fale-conosco')} icone={Ajuda}>Fale Conosco</LinhaLink>
          <LinhaLink to={appPath('perfil/quem-somos')} icone={Ponto}>Quem nós somos</LinhaLink>
        </section>

        <section className="perfil-secao perfil-secao--sair">
          <button type="button" className="perfil-linha perfil-linha--sair" onClick={() => setConfirmando(true)}>
            <Login size={24} className="perfil-linha__icone" aria-hidden="true" />
            <span className="text-caption perfil-linha__texto">Sair</span>
            <Seta size={12} className="perfil-linha__seta" aria-hidden="true" />
          </button>
        </section>
      </div>

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
