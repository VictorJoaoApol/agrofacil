<?php
    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    // Inicia sessão.
    session_start();

    // Checa se há um usuário logado.
    if (!isset($_SESSION["id_usuario"])) {
        // Unauthorized -> Acesso não permitido.
        http_response_code(401);
        echo json_encode([
            "status" => "nao_autenticado",
            "mensagem" => "Nenhuma sessão ativa encontrada."
        ]);
        die;
    }


    // Retorna os dados do usuário guardados na sessão atual.
    http_response_code(200);
    echo json_encode([
        "status" => "sucesso",
        "usuario" => [
            "id" => $_SESSION["id_usuario"],
            "nome" => $_SESSION["nome_usuario"],
            "email" => $_SESSION["email_usuario"]
        ]
    ]);
    exit;
?>