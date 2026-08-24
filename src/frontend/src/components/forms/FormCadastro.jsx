import { NavLink } from "react-router"

function FormCadastro() {
    return (
          <main>
            <section className="card">
              <h1>Cadastre-se</h1>
              <div className="campotexto">
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="" id="nome" placeholder="digite seu nome" />
              </div>
              <div className="campotexto">
                <label htmlFor="email">Email:</label>
                <input type="text" name="" id="email" placeholder="digite seu email" />
              </div>
              <div className="campotexto">
                <label htmlFor="senha">Senha:</label>
                <input type="password" name="" id="senha" placeholder="digite sua senha" />
              </div>
                <NavLink to = "/app">Home</NavLink> 
                <NavLink to = "/login">Login</NavLink>
            </section>
        </main>
    )
}

export default FormCadastro