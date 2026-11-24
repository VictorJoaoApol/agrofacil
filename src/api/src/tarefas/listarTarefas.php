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

    // Importa a conexão com o banco de dados.
    require_once __DIR__ . '/../db/connection.php';

    try {
        // Pega as tarefas do usuário do banco de dados.
        $stmt = $pdo->prepare("SELECT id, nome_tarefa, descricao, esta_feito FROM `agrofacil_db`.`TB_Tarefas` WHERE id_usuario = :id_usuario;");


        // Passa o parâmetro de id do usuário e executa o $stmt.
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();


        // Pega as tarefas no formato de array associativo -> Mudar no connection.php para deixar como padrão depois.
        $tarefas = $stmt->fetch(PDO::FETCH_ASSOC);


        // Verifica se o usuário tem alguma tarefa.
        if (!$tarefas) {
            // No Content -> Sem falhas, mas nenhum conteúdo encontrado.
            http_response_code(204);
            echo json_encode([
                "status" => "sucesso",
                "mensagem" => "Nenhuma tarefa encontrada!"
            ]);
            exit;
        }


        // Retorna mensagem de sucesso.
        http_response_code(200);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Tarefas listadas com sucesso.",
            "tarefas" => $tarefas
        ]);
        exit;

    } catch (PDOException $e) {
        // Manda mensagem de erro interno do servidor caso hajam outros problemas.
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            "status" => "erro_servidor",
            "mensagem" => "Erro interno do Servidor: Erro ao ler tarefas."
        ]);
    }
?>