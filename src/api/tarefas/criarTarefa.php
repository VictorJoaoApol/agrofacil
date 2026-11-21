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
        if (!valida_entrada_formulario($dados['nome_tarefa'] ?? null, $dados['descricao'] ?? null)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao_requisicao",
                "mensagem" => "Preencha todas as entradas obrigatórias."
            ]);
            die;
        }


        // Armazena os dados em variáveis.
        $id_usuario = $_SESSION['id_usuario']; // Puxado da sessão
        $nome_tarefa = $dados['nome_tarefa'];
        $descricao = $dados['descricao'];


        // Prepara statement do PDO.
        $stmt = $pdo->prepare("INSERT INTO `agrofacil_db`.`TB_Tarefas` (id_usuario, nome_tarefa, descricao) VALUES (:id_usuario, :nome_tarefa, :descricao);");

        
        // Passa os parâmetros.
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':nome_tarefa', $nome_tarefa);
        $stmt->bindParam(':descricao', $descricao);


        // Executa o $stmt.
        $stmt->execute();


        // Manda mensagem de sucesso caso tudo funcione.
        http_response_code(201);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Tarefa criada com sucesso!",
        ]);
        exit;

    } catch (PDOException $e) {
        // Manda mensagem de erro interno do servidor caso hajam outros problemas ao salvar.
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            "status" => "erro_servidor",
            "mensagem" => "Erro interno do Servidor: Erro ao criar tarefa."
        ]);
    }
?>