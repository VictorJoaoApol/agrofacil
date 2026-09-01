<?php
    /**
     * Função que valida as entradas de um formulário, verificando se elas estão vazias ou se estão definidas.
     * 
     * @param mixed $vars As variáveis que serão validadas.
     * @return bool Valor bool que diz se as variáveis são válidas ou não.
     */
    function valida_entrada_formulario(mixed ...$vars): bool {
        foreach($vars as $var) {
            if (is_string($var) && trim($var) == '') {
                return false;
            }
            if (empty($var) && $var !== '0' && $var !== 0) {
                return false;
            }
        }
        return true;
    }
?>