// pages/Home/Overview.jsx
import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import { Seta } from '../../assets/Icons'
import { appPages, appPath } from '../../routes/pages'
import { obterUsuario } from '../../features/user/userService'

const cards = appPages.filter((p) => p.home)

export default function Overview() {
  const [nome, setNome] = useState('')

  useEffect(() => {
    let ativo = true
    obterUsuario().then((res) => { if (ativo && res.ok) setNome(res.data.nome) })
    return () => { ativo = false }
  }, [])

  return (
    <>
      <header className="home-header">
        <h1 className="text-title-l">Bem vindo, {nome || 'Usuário'}!</h1>
        <p className="text-body">O que vamos fazer hoje?</p>
      </header>

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