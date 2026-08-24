<?php
    // Carrega pacote dotenv pelo composer.
    $root = __DIR__ . '/../../..';
    require_once $root . '/vendor/autoload.php';

    // Carrega as váriaveis de ambiente do arquivo ".env".
    $dotenv = Dotenv\Dotenv::createImmutable($root);
    $dotenv->load();

    // Passa os valores do arquivo para as variáveis.
    $host = $_ENV["DB_HOST"];
    $user = $_ENV["DB_USER"];
    $pwd = $_ENV["DB_PWD"];
    $dbname = $_ENV["DB_NAME"];

    // Inicia um bloco try/catch para captar erros de conexão.
    try {
        // Cria uma conexão PDO com o MySQL.
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pwd);

        // Define o modo de erro do PDO para exceções.
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        // Caso ocorra um erro, o captura graciosamente.
        echo "Erro na conexão: " . $e->getMessage();
    }
?>