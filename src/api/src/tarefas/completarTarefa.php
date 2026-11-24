<?php
    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    // Inicia sessão.
    session_start();

    // Importa a conexão com o banco de dados e função de validação da entrada do formulário.
    require_once __DIR__ . '/../db/connection.php';
    require_once __DIR__ . '/../utils/valida_entrada_formulario.php';


    try {
        // Decodifica a requisição de JSON para um array associativo.
        $dados = json_decode(file_get_contents("php://input"), true);


        // Verifica se a requisição foi recebia apropriadamente.
        if (!is_array($dados)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao_requisicao",
                "mensagem" => "Corpo da requisição formado incorretamente."
            ]);
            die;
        }


        // Valida as entradas.
        if (!valida_entrada_formulario($dados['id'] ?? null)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao_requisicao",
                "mensagem" => "ID da tarefa inválido."
            ]);
            die;
        }


        // Armazena o id em uma variável.
        $id_tarefa = $dados['id'];


        // Prepara statement de atualização.
        $stmt = $pdo->prepare("UPDATE `agrofacil_db`.`TB_Tarefas` SET esta_feito='S' WHERE id=:id;");

        
        // Passa o parâmetro e executa o $stmt.
        $stmt->bindParam(':id', $id_tarefa);
        $stmt->execute();


        // Manda mensagem de sucesso caso tudo funcione.
        http_response_code(201);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Tarefa criada com sucesso!",
        ]);
        exit;

    } catch (PDOException $e) {
        // Manda mensagem de erro interno do servidor caso hajam outros problemas.
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            "status" => "erro_servidor",
            "mensagem" => "Erro interno do Servidor: Erro ao atualizar estado da tarefa."
        ]);
    }
?>