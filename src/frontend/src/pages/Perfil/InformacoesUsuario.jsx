// pages/Perfil/InformacoesUsuario.jsx
import Avatar from '../../components/ui/Avatar.jsx'
import Button from '../../components/ui/Button.jsx'
import useAuth from '../../hooks/useAuth'
import { appPath } from '../../routes/pages'

/* Dados da conta em modo leitura (a edição entra quando houver endpoint de atualização) */
export default function InformacoesUsuario() {
  const { usuario } = useAuth()

  return (
    <>
      <div className="subpagina__voltar">
        <Button variant="link" to={appPath('perfil')}>← Voltar ao perfil</Button>
      </div>

      <header className="perfil-topo">
        <Avatar nome={usuario?.nome} src={usuario?.foto} size={120} />
        <h1 className="text-title-m perfil-topo__nome">Informações do Usuário</h1>
      </header>

      <form className="info-form" onSubmit={(e) => e.preventDefault()}>
        <label className="field">
          <span className="text-body">Nome</span>
          <input className="field__input" value={usuario?.nome ?? ''} readOnly />
        </label>
        <label className="field">
          <span className="text-body">E-mail</span>
          <input className="field__input" type="email" value={usuario?.email ?? ''} readOnly />
        </label>
        <p className="text-caption info-form__nota">
          Para alterar seus dados, use o Fale Conosco.
        </p>
        <Button variant="highlight" to={appPath('fale-conosco')}>Falar com a equipe</Button>
      </form>
    </>
  )
}
