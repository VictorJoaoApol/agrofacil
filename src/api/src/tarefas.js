import { API_URL } from "./config";


// Usado em frontend/src/pages/Tarefas/Tarefas.jsx
export async function criarTarefa(nome_tarefa) {
    const resposta = await fetch(`${API_URL}/tarefas/criarTarefa.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome_tarefa }),
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/pages/Tarefas/Tarefas.jsx
export async function toggleTarefa(id) {
    const resposta = await fetch(`${API_URL}/tarefas/toggleTarefa.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}


// Usado em frontend/src/pages/Tarefas/Tarefas.jsx
export async function listarTarefas() {
    const resposta = await fetch(`${API_URL}/tarefas/listarTarefas.php`, {
        method: "GET",
        credentials: "include",
    });

    // Espera a resposta chegar e a retorna.
    return {
        ok: resposta.ok,
        ...(await resposta.json()),
    };
}