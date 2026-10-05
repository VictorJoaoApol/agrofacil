// services/auth.js  (mesmos nomes e mesmo formato de retorno: FormLogin, FormCadastro,
// Logout e AuthContext continuam funcionando sem alteração)
import { requisitar } from './http'

export const cadastro = (nome, email, senha) =>
  requisitar('/auth/cadastro.php', { metodo: 'POST', corpo: { nome, email, senha } })

export const login = (email, senha) =>
  requisitar('/auth/login.php', { metodo: 'POST', corpo: { email, senha } })

export const logout = () => requisitar('/auth/logout.php', { metodo: 'POST' })

export const verificarSessao = () => requisitar('/auth/sessao.php')