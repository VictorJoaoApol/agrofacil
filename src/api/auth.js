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