// pages/Perfil/QuemSomos.jsx
import Button from '../../components/ui/Button.jsx'
import logo from '../../assets/img/Logo.png'
import { appPath } from '../../routes/pages'

/* Página institucional do aplicativo */
export default function QuemSomos() {
  return (
    <>
      <div className="subpagina__voltar">
        <Button variant="link" to={appPath('perfil')}>← Voltar ao perfil</Button>
      </div>

      <article className="sobre">
        <img className="sobre__logo" src={logo} alt="" />
        <h1 className="text-title-m">Quem nós somos</h1>
        <p className="text-body">
          O AgroFácil nasceu para levar a tecnologia do campo a quem vive dele. Sensores IoT,
          clima e irrigação reunidos em um só lugar, com linguagem simples.
        </p>
        <p className="text-body">
          Nosso objetivo é ajudar produtores a economizar água, acompanhar cada área de
          irrigação e decidir com dados sobre a própria terra.
        </p>
        <p className="text-body">
          Dúvidas ou sugestões? Fale com a nossa equipe pelo menu do Perfil.
        </p>
      </article>
    </>
  )
}
