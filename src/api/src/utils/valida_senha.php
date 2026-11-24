<?php
    /**
     * Função que valida uma senha de acordo com os seguintes parâmetros:
     * -> Tamanho (mínimo 8);
     * -> Ter letra maiúscula;
     * -> Ter letra minúscula;
     * -> Ter número;
     * -> Ter caracter especial;
     * -> Não ser nula/vazia.
     * 
     * @param string $senha A senha a ser validada.
     * @return array Lista contendo a validaade da senha e o erro que causou a invalidação, se ocorrida.
     */
    function valida_senha(string $senha): array{
        $erro = null;
        $ok = false;

        $senha = trim($senha);

        // 1ª regra: Não pode ser nula.
        if ($senha === "") {
            $erro = "A senha não pode estar vazia.";
        }
        // 2ª regra: Mínimo de 8 caracteres.
        elseif (strlen($senha) < 8) {
            $erro = "A senha deve ter ao menos 8 caracteres.";
        }

        // 3ª regra: Ao menos uma letra maiúscula.
        elseif (!preg_match('/[A-Z]/', $senha)) {
            $erro = "A senha deve conter ao menos uma letra maiúscula.";
        }

        // 4ª regra: Ao menos uma letra minúscula.
        elseif (!preg_match('/[a-z]/', $senha)) {
            $erro = "A senha deve conter ao menos uma letra minúscula.";
        }

        // 5ª regra: Ao menos um número.
        elseif (!preg_match('/\d/', $senha)) {
            $erro = "A senha deve conter ao menos um dígito numérico";
        }

        // 6ª regra: Ao menos um caractere especial.
        elseif (!preg_match('/[\W_]/', $senha)) {
            $erro = "A senha deve conter ao menos um caractere especial.";
        }

        // Valida a senha se nenhuma das regras for quebrada.
        else {
            $ok = true;
        }

        return ["ok" => $ok, "erro" => $erro];
    }
    
?>