import { Link } from 'react-router'
import { Seta } from '../../assets/Icons'
import { appPath } from '../../routes'
import tarefasImg from '../../assets/img/Tarefas.png'
import painelImg from '../../assets/img/Painel.png'
import logo from '../../assets/img/Logo.png'

const cards = [
  { titulo: 'Tarefas', texto: 'Veja suas tarefas, metas e progresso nos seus objetivos', img: tarefasImg, to: appPath('tarefas') },
  { titulo: 'Painel', texto: 'Veja informações sobre seu uso de água, áreas de irrigação e o clima!', img: painelImg, to: appPath('painel'), invertido: true },
]

export default function Overview() {
  return (
    <>
      <header>
        <img src={logo} className="icon" alt="Logo" />
        <h1>Bem vindo, Usuário!</h1>
        <p>O que vamos fazer hoje?</p>
      </header>

      {cards.map(({ titulo, texto, img, to, invertido }) => (
        <div className="cardHome" key={titulo}>
          {!invertido && <div className="cardImg"><img src={img} className="cardIcone" alt="" /></div>}
          <div className="cardConteudo">
            <h1 className="cardTitulo">{titulo}</h1>
            <p className="cardTexto">{texto}</p>
            <Link to={to} className="cardBotao">Vamos<Seta aria-hidden="true" /></Link>
          </div>
          {invertido && <div className="cardImg"><img src={img} className="cardIcone" alt="" /></div>}
        </div>
      ))}
    </>
  )
}