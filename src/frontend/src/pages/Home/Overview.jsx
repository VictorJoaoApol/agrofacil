// pages/Home/Overview.jsx
import Button from '../../components/ui/Button.jsx'
import { Seta } from '../../assets/Icons'
import useAuth from '../../hooks/useAuth'
import { appPages, appPath } from '../../routes/pages'

/* Filtra apenas os módulos configurados para exibição no painel inicial */
const cards = appPages.filter((p) => p.home)

/* Página inicial da área logada com atalhos para os principais recursos */
export default function Overview() {
  /* Resgata as informações do usuário logado */
  const { usuario } = useAuth()
  
  /* Extrai o primeiro nome para a saudação inicial */
  const primeiroNome = usuario?.nome?.split(' ')[0]

  return (
    <>
      <header className="home-header">
        <h1 className="text-title-l">Bem vindo, {primeiroNome || 'Usuário'}!</h1>
        <p className="text-body">O que vamos fazer hoje?</p>
      </header>

      {/* Grade de cartões de navegação rápida do sistema */}
      <div className="home-cards">
        {cards.map(({ path, label, home }, i) => (
          <article
            key={path}
            className={`home-card home-card--${home.tone} ${i % 2 ? 'is-reversed' : ''}`}
          >
            <div className="home-card__img">
              <img src={home.img} alt="" />
            </div>
            <div className="home-card__body">
              <h2 className="text-title-s">{label}</h2>
              <p className="text-body">{home.text}</p>
              <Button to={appPath(path)}>
                Vamos<Seta aria-hidden="true" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}