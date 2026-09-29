import { NavLink } from "react-router";
import { Item, Ponto, Usuario } from "../../assets/Icons";

function ItemNavegacao({ link, icone: Icone, placeholder }) {
    return (
        <NavLink to={link}>
            <Icone aria-label={placeholder} role="img" />
        </NavLink>
    )
}

function BarraNavegacao() {
    return (
        <div className="barraNavegacao">
            <ItemNavegacao link="/painel" icone={Item} placeholder="Painel" />
            <ItemNavegacao link="/tarefas" icone={Ponto} placeholder="Tarefas" />
            <ItemNavegacao link="/perfil" icone={Usuario} placeholder="Perfil" />
        </div>
    )
}

export default BarraNavegacao;