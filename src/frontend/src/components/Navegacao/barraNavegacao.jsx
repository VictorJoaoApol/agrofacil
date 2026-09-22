import { NavLink } from "react-router";

function ItemNavegacao({ link, icone, placeholder }){
    return(
        <>
            <NavLink to={link} className="">
                <img src={icone} className="" alt={placeholder}></img>
            </NavLink>
            
        </>
    )
}

function BarraNavegacao(){
    return(
        <div className="barraNavegacao">
            <ItemNavegacao link={""} icone={""} placeholder={""}/>
            <ItemNavegacao link={""} icone={""} placeholder={""}/>
            <ItemNavegacao link={""} icone={""} placeholder={""}/>
            <ItemNavegacao link={""} icone={""} placeholder={""}/>
            <ItemNavegacao link={""} icone={""} placeholder={""}/>
        </div>
    )
}

export default BarraNavegacao;