# BACKEND - AgroFácil

## PHP

Este backend foi feito utilizando PHP 8.2.12
Boa parte do código poderia ser menor e mais concisa, e há partes repetidas de sobra, mas priorizamos terminar primeiro antes de otimizar.

### Bibliotecas
Todas as bibliotecas são importadas e utilizadas via Composer.

- **"vlucas/phpdotenv"** -> leitura de arquivo `.env` com credenciais privadas;
- **"phpmailer/phpmailer"** -> envio de emails de recuperação de senha;

## Banco de Dados

O banco utilizado é o MySQL do XAMPP (10.4.32-MariaDB)
Parte do banco (Sensores + Áreas de Irrigação) não é utilizada ainda, devido à incapacidade da implementação real do sistema IoT.