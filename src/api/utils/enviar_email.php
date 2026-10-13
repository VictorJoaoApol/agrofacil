<?php
    // Importa a biblioteca PHPMailer.
    require_once __DIR__ . '/../../../vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;


    /**
     * Envia email de recuperação de senha para a conta indicada.
     * Email inclui botão com token que manda para a recuperação de senha.
     * 
     * @param string $email_destino Email da conta.
     * @param string $nome_usuario Nome do usuário dono da conta.
     * @param string $link Link para a página de recuperação (contém o token).
     * @return array Lista contento o status de sucesso e erros, se presentes.
     */
    function envia_email_recuperacao(string $email_destino, string $nome_usuario, string $link): array {
        // Cria objeto do email (true -> habilita exceções/erros)
        $mail = new PHPMailer(true);

        try {
    
            // Configura o servidor de email (valores já puxados no .env).
            $mail->isSMTP();
            $mail->Host = $_ENV["SMTP_HOST"];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV["SMTP_USER"];
            $mail->Password = $_ENV["SMTP_PASS"];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = (int) $_ENV["SMTP_PORT"];
            $mail->CharSet = "UTF-8";

            $mail->setFrom($_ENV["SMTP_FROM"], "AgroFácil");
            $mail->addAddress($email_destino, $nome_usuario);

            $mail->isHTML(true);
            $mail->Subject = "Redefinição de senha - Agrofácil";


            // Corpo do email com o botão.
            $mail->Body = "
                <div style='font-family: Arial, sans-serif; font-size: 16px; text-align: center; padding: 24px;'>
                    <p>Olá, {$nome_usuario}!</p>
                    <p>Recebemos um pedido para redefinir a senha da sua conta no AgroFácil.</p>
                    <p>
                        <a href='{$link}' style='display: inline-block; background-color: #2e7d32; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 18px; margin: 16px 0;'>
                            Criar nova senha
                        </a>
                    </p>
                    <p>Esse link é válido por 30 minutos.</p>
                    <p>Se você não pediu isso, pode ignorar este email.</p>
                </div>
            ";

            // Corpo alternativo caso não seja possível enviar o HTML.
            $mail->AltBody = "Para redefinir sua senha, acesse: {$link} (válido por 30 minutos). Se você não pediu isso, ignore este email.";


            // Envia o email e retorna o resultado.
            $mail->send();
            return ["ok" => true, "erro" => null];

        } catch (Exception $e) {

            // Envia status e erro caso não funcione.
            error_log("Erro ao validar email: " . $mail->ErrorInfo);
            return ["ok" => false, "erro" => $mail->ErrorInfo];
        }
    }
?>