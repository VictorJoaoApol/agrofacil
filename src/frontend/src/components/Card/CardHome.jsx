function cardHomeIcone({classe, icone}){
    return(
            <div className={classe}>
                <img src={icone} className="cardImg"></img>
            </div>
    )
}

function cardHomeTexto({classe, titulo, texto, textoBotao}){
    return(
            <div className={classe}>
                <h1>{titulo}</h1>
                <p>{texto}</p>
                <button className="cardBotao">{textoBotao}<img src=""></img></button>
            </div>
    )
}

function cardTarefas() {
    return(
        <div className="cardTarefas">
            <cardHomeIcone classe = {""} icone = {""}/>
            <cardHomeTexto classe = {""} titulo = {""} texto = {""} textoBotao = {""} />
        </div>
    )
}

export default cardTarefas