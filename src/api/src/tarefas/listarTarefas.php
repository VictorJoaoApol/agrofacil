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
        // Puxa o ID do usuário da sessão.
        $id_usuario = $_SESSION['id_usuario'];


        // Pega as tarefas do usuário do banco de dados.
        $stmt = $pdo->prepare("SELECT id, nome_tarefa, esta_feito FROM `agrofacil_db`.`TB_Tarefas` WHERE id_usuario = :id_usuario;");


        // Passa o parâmetro de id do usuário e executa o $stmt.
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();


        // Pega as tarefas no formato de array associativo -> Mudar no connection.php para deixar como padrão depois.
        $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Verifica se o usuário tem alguma tarefa.
        if (count($tarefas) === 0) {
            // Sucesso, mas nenhuma tarefa encontrada.
            http_response_code(200);
            echo json_encode([
                "status" => "sucesso",
                "mensagem" => "Nenhuma tarefa encontrada!",
                "tarefas" => $tarefas
            ]);
            exit;
        }


        // Retorna mensagem de sucesso e tarefas.
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