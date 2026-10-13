<?php
    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    // Importa a conexão com o banco de dados e as funções de validação.
    require_once __DIR__ . '/../db/connection.php';
    require_once __DIR__ . '/../utils/valida_entrada_formulario.php';
    require_once __DIR__ . '/../utils/valida_senha.php';


    try {
        // Decodifica a requisição de JSON para um array associativo.
        $dados = json_decode(file_get_contents("php://input"), true);


        // Verifica se a requisição foi recebida apropriadamente.
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
        if (!valida_entrada_formulario($dados['token'] ?? null, $dados['senha'] ?? null)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao_requisicao",
                "mensagem" => "Preencha todas as entradas obrigatórias."
            ]);
            die;
        }


        // Armazena os dados em variáveis.
        $token = $dados['token'];
        $senha = $dados['senha'];


        // Busca o token no banco.
        $stmt = $pdo->prepare("SELECT id, id_usuario, validade FROM `agrofacil_db`.`TB_Tokens_Recuperacao` WHERE token = :token;");
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        $registro = $stmt->fetch(PDO::FETCH_ASSOC);


        // Verifica se o token existe e se não venceu.
        if (!$registro || strtotime($registro['validade'] < time())) {
            // Unauthorized -> Acesso não permitido.
            http_response_code(400);
            echo json_encode([
                "status" => "token_invalido",
                "mensagem" => "O token é inválido ou expirou. Solicite uma troca de senha novamente."
            ]);
            die;
        }


        // Valida a nova senha.
        $resultado_senha = valida_senha($senha);
        if (!$resultado_senha["ok"]) {
            // Unprocessable Content -> Conteúdo improcessável.
            http_response_code(422);
            echo json_encode([
                "status" => "erro_validacao_credencial",
                "mensagem" => "Senha inválida: " . ($resultado_senha["erro"] ?? "Tente novamente!")
            ]);
            die;
        }


         // Depois de validar, hasheia a senha.
        $hash_senha = password_hash($senha, PASSWORD_DEFAULT);


        // Atualiza a senha do usuário no banco.
        $stmt = $pdo->prepare("UPDATE ``.`` SET hash_senha = :hash_senha WHERE id = :id_usuario;");
        $stmt->bindParam(':hash_senha', $hash_senha);
        $stmt->bindParam(':id_usuario', $registro['id_usuario']);


        // Deleta a entrada anterior do banco.
        $stmt = $pdo->prepare("DELETE FROM `agrofacil_db`.`TB_Tokens_Recuperacao` WHERE id = :id;");
        $stmt->bindParam(':id', $registro['id']);
        $stmt->execute();


        // Retorna mensagem de sucesso.
        http_response_code(200);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Senha redefinida com sucesso!"
        ]);
        exit;

    } catch (PDOException $e) {
        // Manda erro interno do servidor caso hajam outros problemas.
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            "status" => "erro_servidor",
            "mensagem" => "Erro interno do Servidor: Erro ao redefinir senha."
        ]);
    }
?>