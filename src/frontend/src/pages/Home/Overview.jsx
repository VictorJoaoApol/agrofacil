// pages/Home/Overview.jsx
import Button from '../../components/ui/Button.jsx'
import { Seta } from '../../assets/Icons'
import useAuth from '../../hooks/useAuth'
import { appPages, appPath } from '../../routes/pages'
import logo from '../../assets/img/Logo.png'

/* Filtra apenas os módulos configurados para exibição na tela inicial */
const cards = appPages.filter((p) => p.home)

/* Tela inicial: logo, saudação e um card de atalho por módulo (imagem de um lado, texto do outro) */
export default function Overview() {
  const { usuario } = useAuth()
  const primeiroNome = usuario?.nome?.split(' ')[0]

  return (
    <>
      <header className="home-header">
        <img className="home-header__logo" src={logo} alt="" />
        <h1 className="text-title-l">Bem vindo, {primeiroNome || 'Usuário'}!</h1>
        <p className="text-body">O que vamos fazer hoje?</p>
      </header>

      <div className="home-cards">
        {cards.map(({ path, label, home }, i) => (
          <article key={path} className={`home-card ${i % 2 ? 'is-reversed' : ''}`}>
            <div className="home-card__img">
              <img src={home.img} alt="" />
            </div>
            <div className="home-card__body">
              <h2 className="text-title-s home-card__titulo">{label}</h2>
              <p className="text-body home-card__texto">{home.text}</p>
              <Button to={appPath(path)}>
                Vamos<Seta size={16} aria-hidden="true" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
