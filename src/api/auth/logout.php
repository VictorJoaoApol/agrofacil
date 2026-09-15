<?php
    // Inicia sessão.
    session_start();

    // Checa se há um usuário logado.
    if (!isset($_SESSION["id_usuario"])) {
        http_response_code(200);
        echo json_encode([
            "status" => "ja_deslogado",
            "mensagem" => "Nenhuma sessão ativa encontrada."
        ]);
        exit;
    }

    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    
    // Esvazia o array da sessão.
    $_SESSION = [];


    // Recebe parâmetros dos cookies da sessão.
    $params = session_get_cookie_params();


    // Esvazia os cookies da sessão.
    setcookie(
        session_name(),
        "",
        (time() - 3600),
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );


    // Destrói a sessão.
    session_destroy();


    // Retorna mensagem de sucesso.
    http_response_code(200);
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Logout feito com sucesso."
    ]);
    exit;
?>