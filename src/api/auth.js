import { API_URL } from "./config"

// Usado em frontend/src/components/forms/FormCadastro.jsx
export async function cadastro(nome, email, senha) {
    const resposta = await fetch(`${API_URL}/auth/cadastro.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/components/forms/FormLogin.jsx
export async function login(email, senha) {
    const resposta = await fetch(`${API_URL}/auth/login.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/components/forms/Logout.jsx
export async function logout() {
    const resposta = await fetch(`${API_URL}/auth/logout.php`, {
        method: "POST",
        credentials: "include",
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/context/AuthContext.jsx
export async function verificarSessao() {
    const resposta = await fetch(`${API_URL}/auth/sessao.php`, {
        method: "GET",
        credentials: "include",
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/components/forms/FormRecuperarSenha.jsx
export async function solicitarRecuperacao(email) {
    const resposta = await fetch(`${API_URL}/auth/solicitar_recuperacao.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/components/forms/FormRedefinirSenha.jsx
export async function redefinirSenha(token, senha) {
    const resposta = await fetch(`${API_URL}/auth/redefinir_senha.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, senha }),
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}