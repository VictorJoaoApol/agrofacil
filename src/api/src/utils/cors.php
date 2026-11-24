<?php
    // Manda cabeçalhos HTTP necessários para lidar com a requisição.
    header("Content-Type: application/json");                       // Permite o envio da resposta
    header("Access-Control-Allow-Origin: http://localhost:5173");   // Permite acesso do frontend
    header("Access-Control-Allow-Credentials: true");               // Permite envio de cookies
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");     // Permite requisições GET, POST e OPTIONS (Setup do React pra enviar os dados)
    header("Access-Control-Allow-Headers: Content-Type");           // Permite requisições com conteúdo customizado

    // Verifica se o React está fazendo algum setup e imediatamente retorna sucesso.
    if ($_SERVER["REQUEST_METHOD"] == 'OPTIONS') {
        http_response_code(200);
        exit;
    }