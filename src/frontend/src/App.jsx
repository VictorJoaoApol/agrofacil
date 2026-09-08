import { Routes, Route } from 'react-router'
import './App.css'

import Teste from './pages/Teste.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home/Home.jsx'
import Overview from './pages/Home/Overview.jsx'
import FaleConosco from './pages/Home/FaleConosco.jsx'

import Cadastro from './pages/RegistrosUsuarios/Cadastro.jsx'
import Login from './pages/RegistrosUsuarios/Login.jsx'
import FormLogin from './components/forms/FormLogin.jsx'
import RecuperarSenha from './pages/RegistrosUsuarios/RecuperarSenha.jsx'

import Dispositivos from './pages/Dispositivos/Dispositivos.jsx'
import Tarefas from './pages/Tarefas/Tarefas.jsx'
import Painel from './pages/Painel/Painel.jsx'
import Perfil from './pages/Perfil/Perfil.jsx'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Teste />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/login" element={<Login />}>
          <Route index element={<FormLogin />}></Route>
          <Route path="recuperar-senha" element={<RecuperarSenha />}></Route>
        </Route>
        <Route path="/app" element={<Home />}>
          <Route index element={<Overview />}></Route>
          <Route path="tarefas" element={<Tarefas />}></Route>
          <Route path="dispositivos" element={<Dispositivos />}></Route>
          <Route path="painel" element={<Painel />}></Route>
          <Route path="perfil" element={<Perfil />}></Route>
          <Route path="faleconosco" element={<FaleConosco />}></Route>
        </Route>
      </Routes>
  )
}

export default App
