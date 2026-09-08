function Icones({ foto, texto = "Ícone", tamanho }) {

  const classeElemento = `IconeMenu ${tamanho ? tamanho : ''}`.trim();

  return (
      <img src={foto} alt={texto} className={classeElemento} />
  );
}

export default Icones;