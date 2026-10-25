// services/auth.js
import { requisitar } from './http'

/* Realiza o cadastro de um novo usuário na aplicação */
export const cadastro = (nome, email, senha) =>
  requisitar('/auth/cadastro.php', { metodo: 'POST', corpo: { nome, email, senha } })

/* Autentica o usuário com e-mail e senha */
export const login = (email, senha) =>
  requisitar('/auth/login.php', { metodo: 'POST', corpo: { email, senha } })

/* Encerra a sessão ativa do usuário no servidor */
export const logout = () => requisitar('/auth/logout.php', { metodo: 'POST' })

/* Verifica se existe uma sessão válida e ativa no servidor */
export const verificarSessao = () => requisitar('/auth/sessao.php')

// URL base da API PHP, sem barra no final. Ajuste para onde o seu PHP responde.
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost/agrofacil/api').replace(/\/+$/, '')