function Icones({ icone: Icone, texto = "Ícone", tamanho }) {
    const classeElemento = `IconeMenu ${tamanho ? tamanho : ''}`.trim();

    return <Icone className={classeElemento} aria-label={texto} role="img" />;
}

export default Icones;