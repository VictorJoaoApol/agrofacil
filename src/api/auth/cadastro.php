<?php
    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    // Inicia sessão.
    session_start();

    // Verifica se o usuário já está logado.
    if (isset($_SESSION["id_usuario"])) {
        // Conflict -> Conflito.
        http_response_code(409);
        echo json_encode([
            "status" => "ja_logado",
            "mensagem" => "Usuário já está logado!"
        ]);
        die;
    }

    // Importa a conexão com o banco de dados e função de validação da entrada do formulário.
    require_once __DIR__ . '/../db/connection.php';
    require_once __DIR__ . '/../utils/valida_entrada_formulario.php';
    require_once __DIR__ . '/../utils/valida_senha.php';


    try {
        // Decodifica a requisição de JSON para um array associativo.
        $dados = json_decode(file_get_contents("php://input"), true);


        // Verifica se a requisição foi recebia apropriadamente.
        if (!is_array($dados)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao",
                "mensagem" => "Corpo da requisição formado incorretamente."
            ]);
            die;
        }


        // Valida as entradas.
        if (!valida_entrada_formulario($dados['nome'] ?? null, $dados['email'] ?? null, $dados['senha'] ?? null)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao",
                "mensagem" => "Preencha todas as entradas obrigatórias."
            ]);
            die;
        }


        // Armazena os dados em variáveis.
        $nome = $dados['nome'];
        $email = $dados['email'];
        $senha = $dados['senha'];


        // Valida a senha.
        $resultado_senha = valida_senha($senha);
        if (!$resultado_senha["ok"]) {
            // Unprocessable Content -> Conteúdo improcessável.
            http_response_code(422);
            echo json_encode([
                "status" => "erro_validacao",
                "mensagem" => "Senha inválida: " . ($resultado_senha["erro"] ?? "Tente novamente!")
            ]);
            die;
        }


        // Depois de validar, hashear a senha.
        $hash_senha = password_hash($senha, PASSWORD_DEFAULT);


        // Prepara statement do PDO para concretizar cadastro.
        $stmt = $pdo->prepare("INSERT INTO `agrofacil_db`.`TB_Usuarios` (nome, email, hash_senha) VALUES (:nome, :email, :hash_senha);");

        
        // Passa os parâmetros.
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':hash_senha', $hash_senha);


        // Executa o $stmt.
        $stmt->execute();


        // Manda mensagem de sucesso caso tudo funcione, assim como o ID do cliente cadastrado.
        http_response_code(201);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Usuário cadastrado com sucesso!",
            "id" => $pdo->lastInsertId()
        ]);
        exit;

    } catch (PDOException $e) {
        // Verifica se o erro se deu devido à quebra o UNIQUE do email (código 23000).
        if ($e->getCode() === '23000') {
            // Conflict -> Conflito.
            http_response_code(409);
            echo json_encode([
                "status" => "conflito",
                "mensagem" => "Email já cadastrado em outra conta."
            ]);
        } else {
            // Manda mensagem de erro interno do servidor caso hajam outros problemas ao salvar.
            error_log($e->getMessage());
            http_response_code(500);
            echo json_encode([
                "status" => "erro_servidor",
                "mensagem" => "Erro interno do Servidor: Erro ao cadastrar usuário."
            ]);
        }
    }
?>