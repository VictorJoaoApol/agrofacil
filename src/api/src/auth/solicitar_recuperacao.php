<?php
    // Importa os headers necessários para lidar com a requisição.
    require_once __DIR__ . '/../utils/cors.php';

    // Importa a conexão com o banco de dados, validação de entrada e envio de email.
    require_once __DIR__ . '/../db/connection.php';
    require_once __DIR__ . '/../utils/valida_entrada_formulario.php';
    require_once __DIR__ . '/../utils/enviar_email.php';


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


        // Valida a entrada.
        if (!valida_entrada_formulario($dados['email'] ?? null)) {
            // Bad Request -> Requisição inválida.
            http_response_code(400);
            echo json_encode([
                "status" => "erro_validacao_requisicao",
                "mensagem" => "Informe um email."
            ]);
            die;
        }


        // Armazena o dado em uma variável.
        $email = $dados['email'];


        // Busca o usuário dono do email.
        $stmt = $pdo->prepare("SELECT id, nome, email FROM `agrofacil_db`.`TB_Usuarios` WHERE email = :email;");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        
        // Verifica se o usuário existe, e então gera o token.
        if ($usuario) {
            // Token aleatório de 256 bits, convertido pra hexadecimal.
            // Cria uma data de validade de 20 minutos a partir da geração.
            $token = bin2hex(random_bytes(32));
            $validade = (new DateTime())->modify('+20 minutes')->format('Y-m-d H:i:s');


            // Invalida tokens antigos, caso existam.
            $stmt = $pdo->prepare("DELETE FROM `agrofacil_db`.`TB_Tokens_Recuperacao` WHERE id_usuario = :id_usuario;");
            $stmt->bindParam(':id_usuario', $usuario['id']);
            $stmt->execute();


            // Salva o novo token.
            $stmt = $pdo->prepare("INSERT INTO `agrofacil_db`.`TB_Tokens_Recuperacao` (id_usuario, token, validade) VALUES (:id_usuario, :token, :validade);");
            $stmt->bindParam(':id_usuario', $usuario['id']);
            $stmt->bindParam(':token', $token);
            $stmt->bindParam(':validade', $validade);
            $stmt->execute();


            // Monta o link mágico :P
            $link = "localhost:5173" /*Temporário*/ . "/login/redefinir-senha?token=" . $token;


            // Coleta o resultado do email.
            $resultado_email = envia_email_recuperacao($usuario['email'], $usuario['nome'], $link);


            // Envia mensagem de erro interno caso não seja possível enviar a mensagem.
            if (!$resultado_email['ok']) {
                // Internal Server Error -> Erro interno do servidor.
                http_response_code(500);
                echo json_encode([
                    "status" => "erro_servidor",
                    "mensagem" => "Erro interno do Servidor: Erro ao enviar email."
                ]);
                die;
            }
        }

        // Envia resposta genéricas, esteja o email no banco de dados ou não.
        http_response_code(200);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Mandamos um link de redefinição de senha para o email informado."
        ]);
        exit;

    } catch (PDOException $e) {
        // Manda mensagem de erro caso hajam outros problemas.
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            "status" => "erro_servidor",
            "mensagem" => "Erro interno do Servidor: Erro ao solicitar recuperação de senha."
        ]);
    }
