import BarraNavegacao from "../../components/Navegacao/barraNavegacao.jsx";

function Home() {
    return (

        <>
            <header>
                <img src="src/assets/img/Logo.png" className="icon"></img>
                <h1>Bem vindo, Usuário!</h1>
                <p>O que vamos fazer hoje?</p>
            </header>

            <div className="cardHome">
                <div className="cardImg">
                    <img src="src/assets/img/Tarefas.png" className="cardIcone"></img>
                </div>
                <div className="cardConteudo">
                    <h1 className="cardTitulo">Tarefas</h1>
                    <p className="cardTexto">Veja suas tarefas, metas e progresso nos seus objetivos</p>
                    <button className="cardBotao">Vamos<img src="src/assets/Icons/botao/Seta.svg"></img></button>
                </div>
            </div>

            <div className="cardHome">
                <div className="cardConteudo">
                    <h1 className="cardTitulo">Painel</h1>
                    <p className="cardTexto">Veja informações sobree seu uso de água, áreas de irrigação e o clima!</p>
                    <button className="cardBotao">Vamos<img src="src/assets/Icons/botao/Seta.svg"></img></button>
                </div>
                <div className="cardImg">
                    <img src="src/assets/img/Painel.png" className="cardIcone"></img>
                </div>
            </div>

            <BarraNavegacao />
        </>
        
    );
}

export default Home;