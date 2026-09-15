<?php
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

    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    // Importa a conexão com o banco de dados e função de validação da entrada do formulário.
    require_once __DIR__ . '../db/connection.php';
    require_once __DIR__ . '../utils/valida_entrada_formulario.php';
    require_once __DIR__ . '../utils/valida_senha.php';


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
        if (!valida_entrada_formulario($dados['email'] ?? null, $dados['senha'] ?? null)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao_requisicao",
                "mensagem" => "Preencha todas as entradas obrigatórias."
            ]);
            die;
        }


        // Armazena os dados em variáveis.
        $email = $dados['email'];
        $senha = $dados['senha'];


        // Pega a senha original do banco de dados.
        $stmt = $pdo->prepare("SELECT id, nome, email, hash_senha FROM `agrofacil_db`.`TB_Usuarios` WHERE email = :email;");


        // Passa o parâmetro de email.
        $stmt->bindParam(':email', $email);


        // Executa o $stmt.
        $stmt->execute();


        // Pega os dados do usuário.
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);


        // Verifica se o usuário (email) existe.
        if (!$usuario) {
            // Unauthorized -> Acesso não permitido.
            http_response_code(401);
            echo json_encode([
                "status" => "erro_validacao_credencial",
                "mensagem" => "Email ou senha inválidos."
            ]);
            die;
        }


        // Compara a senha fornecida com a senha do usuário.
        if (!password_verify($senha, $usuario["hash_senha"])) {
            // Unauthorized -> Acesso não permitido.
            http_response_code(401);
            echo json_encode([
                "status" => "erro_validacao_credencial",
                "mensagem" => "Email ou senha inválidos."
            ]);
            die;
        }


        // Evita ataques de session fixation, criando um novo ID de sessão e removendo o ID anterior.
        session_regenerate_id(true);


        // Guarda o usuário na sessão atual.
        $_SESSION['id_usuario'] = $usuario["id"];
        $_SESSION['nome_usuario'] = $usuario["nome"];
        $_SESSION['email_usuario'] = $usuario["email"];


        // Retorna mensagem de sucesso para o login do usuário.
        http_response_code(200);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Usuário logado com sucesso!"
        ]);
        exit;

    } catch (PDOException $e) {
        // Manda mensagem de erro interno do servidor caso hajam outros problemas ao logar.
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            "status" => "erro_servidor",
            "mensagem" => "Erro interno do Servidor: Erro no login."
        ]);
    }
?>