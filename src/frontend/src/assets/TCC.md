**BANCO DE DADOS (MYSQL)**

\-- schema.sql

CREATE DATABASE IF NOT EXISTS agroiot\_tcc;

USE agroiot\_tcc;



\-- Tabela de usuários

CREATE TABLE usuarios (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   nome VARCHAR(100) NOT NULL,

&#x20;   email VARCHAR(100) UNIQUE NOT NULL,

&#x20;   senha VARCHAR(255) NOT NULL,

&#x20;   telefone VARCHAR(20),

&#x20;   cpf VARCHAR(14),

&#x20;   tipo VARCHAR(20) DEFAULT 'agricultor', -- agricultor, admin

&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);



\-- Tabela de áreas (talhões)

CREATE TABLE areas (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   usuario\_id INT NOT NULL,

&#x20;   nome VARCHAR(100) NOT NULL,

&#x20;   tamanho\_hectares DECIMAL(10,2),

&#x20;   cultura VARCHAR(100),

&#x20;   latitude DECIMAL(10,8),

&#x20;   longitude DECIMAL(11,8),

&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

&#x20;   FOREIGN KEY (usuario\_id) REFERENCES usuarios(id) ON DELETE CASCADE

);



\-- Tabela de dispositivos IoT

CREATE TABLE dispositivos (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   usuario\_id INT NOT NULL,

&#x20;   area\_id INT NULL,

&#x20;   nome VARCHAR(100) NOT NULL,

&#x20;   tipo VARCHAR(50) NOT NULL, -- temperatura, umidade\_solo, umidade\_ar, pluviometro

&#x20;   mac\_address VARCHAR(17) UNIQUE,

&#x20;   status ENUM('ativo', 'inativo', 'manutencao') DEFAULT 'ativo',

&#x20;   ultima\_leitura DATETIME,

&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

&#x20;   FOREIGN KEY (usuario\_id) REFERENCES usuarios(id) ON DELETE CASCADE,

&#x20;   FOREIGN KEY (area\_id) REFERENCES areas(id) ON DELETE SET NULL

);



\-- Tabela de leituras dos sensores (dados históricos)

CREATE TABLE leituras (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   dispositivo\_id INT NOT NULL,

&#x20;   valor DECIMAL(10,2) NOT NULL,

&#x20;   unidade VARCHAR(10), -- °C, %, mm, etc

&#x20;   data\_hora DATETIME DEFAULT CURRENT\_TIMESTAMP,

&#x20;   FOREIGN KEY (dispositivo\_id) REFERENCES dispositivos(id) ON DELETE CASCADE

);



\-- Tabela de notificações

CREATE TABLE notificacoes (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   usuario\_id INT NOT NULL,

&#x20;   titulo VARCHAR(100) NOT NULL,

&#x20;   mensagem TEXT NOT NULL,

&#x20;   tipo VARCHAR(30) DEFAULT 'info', -- info, alerta, perigo

&#x20;   lida BOOLEAN DEFAULT FALSE,

&#x20;   data\_hora DATETIME DEFAULT CURRENT\_TIMESTAMP,

&#x20;   FOREIGN KEY (usuario\_id) REFERENCES usuarios(id) ON DELETE CASCADE

);



\-- Tabela de tarefas (como no seu wireframe)

CREATE TABLE tarefas (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   usuario\_id INT NOT NULL,

&#x20;   descricao TEXT NOT NULL,

&#x20;   data\_limite DATE,

&#x20;   concluida BOOLEAN DEFAULT FALSE,

&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

&#x20;   FOREIGN KEY (usuario\_id) REFERENCES usuarios(id) ON DELETE CASCADE

);



\-- Inserir usuário admin padrão (senha: 123456)

INSERT INTO usuarios (nome, email, senha, tipo) 

VALUES ('Administrador', 'admin@agroiot.com', MD5('123456'), 'admin');



\-- Inserir tarefas padrão (como no wireframe)

INSERT INTO tarefas (usuario\_id, descricao, data\_limite) VALUES

(1, 'Verifique o seu cadastro', '2026-08-26'),

(1, 'Acesse o menu principal para ver suas tarefas', '2026-08-26'),

(1, 'Selecione uma tarefa para editar', '2026-08-25'),

(1, 'Edite a tarefa e salve-o', '2026-08-25'),

(1, 'Salve as alterações', '2026-08-27');



\-- Inserir dispositivos de exemplo

INSERT INTO dispositivos (usuario\_id, nome, tipo, status) VALUES

(1, 'Sensor Temperatura - Talhão A', 'temperatura', 'ativo'),

(1, 'Sensor Umidade Solo - Talhão A', 'umidade\_solo', 'ativo'),

(1, 'Sensor Umidade Ar - Talhão B', 'umidade\_ar', 'ativo'),

(1, 'Pluviômetro - Talhão B', 'pluviometro', 'ativo');



**BACK AND**

<?php

// backend/api/login.php

require\_once '../../includes/config.php';



if ($\_SERVER\['REQUEST\_METHOD'] === 'POST') {

&#x20;   $email = $\_POST\['email'] ?? '';

&#x20;   $senha = $\_POST\['senha'] ?? '';



&#x20;   if (empty($email) || empty($senha)) {

&#x20;       header('Location: ../../pages/login.php?erro=Preencha todos os campos');

&#x20;       exit;

&#x20;   }



&#x20;   try {

&#x20;       $stmt = $pdo->prepare("SELECT id, nome, email, senha, tipo FROM usuarios WHERE email = ?");

&#x20;       $stmt->execute(\[$email]);

&#x20;       $usuario = $stmt->fetch(PDO::FETCH\_ASSOC);



&#x20;       // Verificar senha (usando MD5 como exemplo - em produção use password\_hash)

&#x20;       if ($usuario \&\& md5($senha) === $usuario\['senha']) {

&#x20;           $\_SESSION\['usuario\_id'] = $usuario\['id'];

&#x20;           $\_SESSION\['usuario\_nome'] = $usuario\['nome'];

&#x20;           $\_SESSION\['usuario\_email'] = $usuario\['email'];

&#x20;           $\_SESSION\['usuario\_tipo'] = $usuario\['tipo'];



&#x20;           header('Location: ../../pages/dashboard.php');

&#x20;           exit;

&#x20;       } else {

&#x20;           header('Location: ../../pages/login.php?erro=E-mail ou senha inválidos');

&#x20;           exit;

&#x20;       }

&#x20;   } catch(PDOException $e) {

&#x20;       header('Location: ../../pages/login.php?erro=Erro no sistema, tente novamente');

&#x20;       exit;

&#x20;   }

} else {

&#x20;   header('Location: ../../pages/login.php');

&#x20;   exit;

}

?>



**DASHBOARD COM BANCO DE DADOS** 

<?php

// pages/dashboard.php

session\_start();

if (!isset($\_SESSION\['usuario\_id'])) {

&#x20;   header('Location: login.php');

&#x20;   exit;

}

require\_once '../includes/config.php';



$usuario\_id = $\_SESSION\['usuario\_id'];



// Buscar contagens para os cards

$total\_dispositivos = $pdo->query("SELECT COUNT(\*) FROM dispositivos WHERE usuario\_id = $usuario\_id")->fetchColumn();

$total\_areas = $pdo->query("SELECT COUNT(\*) FROM areas WHERE usuario\_id = $usuario\_id")->fetchColumn();



// Buscar última leitura de temperatura e umidade (exemplo)

$temp = $pdo->query("

&#x20;   SELECT l.valor FROM leituras l 

&#x20;   JOIN dispositivos d ON d.id = l.dispositivo\_id 

&#x20;   WHERE d.usuario\_id = $usuario\_id AND d.tipo = 'temperatura' 

&#x20;   ORDER BY l.data\_hora DESC LIMIT 1

")->fetchColumn();



$umidade = $pdo->query("

&#x20;   SELECT l.valor FROM leituras l 

&#x20;   JOIN dispositivos d ON d.id = l.dispositivo\_id 

&#x20;   WHERE d.usuario\_id = $usuario\_id AND d.tipo = 'umidade\_solo' 

&#x20;   ORDER BY l.data\_hora DESC LIMIT 1

")->fetchColumn();



// Buscar tarefas

$tarefas = $pdo->query("SELECT \* FROM tarefas WHERE usuario\_id = $usuario\_id ORDER BY data\_limite ASC LIMIT 5")->fetchAll();



// Buscar notificações não lidas

$notificacoes\_nao\_lidas = $pdo->query("SELECT COUNT(\*) FROM notificacoes WHERE usuario\_id = $usuario\_id AND lida = FALSE")->fetchColumn();

?>

<!DOCTYPE html>

<html lang="pt-br">

<head>

&#x20;   <meta charset="UTF-8">

&#x20;   <meta name="viewport" content="width=device-width, initial-scale=1.0">

&#x20;   <title>Dashboard - AgroIoT</title>

&#x20;   <link rel="stylesheet" href="../assets/css/style.css">

&#x20;   <link rel="stylesheet" href="../assets/css/dashboard.css">

</head>

<body>

&#x20;   <?php include '../includes/sidebar.php'; ?>



&#x20;   <div class="main-content">

&#x20;       <?php include '../includes/header.php'; ?>



&#x20;       <!-- Cards -->

&#x20;       <div class="cards-grid">

&#x20;           <div class="card">

&#x20;               <div class="card-icon">📟</div>

&#x20;               <div class="card-info">

&#x20;                   <h4>Dispositivos</h4>

&#x20;                   <p class="card-value"><?php echo $total\_dispositivos; ?></p>

&#x20;                   <small>Conectados</small>

&#x20;               </div>

&#x20;           </div>

&#x20;           <div class="card">

&#x20;               <div class="card-icon">🌱</div>

&#x20;               <div class="card-info">

&#x20;                   <h4>Áreas</h4>

&#x20;                   <p class="card-value"><?php echo $total\_areas; ?></p>

&#x20;                   <small>Cadastradas</small>

&#x20;               </div>

&#x20;           </div>

&#x20;           <div class="card">

&#x20;               <div class="card-icon">🌡️</div>

&#x20;               <div class="card-info">

&#x20;                   <h4>Temperatura</h4>

&#x20;                   <p class="card-value"><?php echo $temp ? $temp . '°C' : '--'; ?></p>

&#x20;                   <small>Última leitura</small>

&#x20;               </div>

&#x20;           </div>

&#x20;           <div class="card">

&#x20;               <div class="card-icon">💧</div>

&#x20;               <div class="card-info">

&#x20;                   <h4>Umidade Solo</h4>

&#x20;                   <p class="card-value"><?php echo $umidade ? $umidade . '%' : '--'; ?></p>

&#x20;                   <small>Última leitura</small>

&#x20;               </div>

&#x20;           </div>

&#x20;       </div>



&#x20;       <!-- Tarefas -->

&#x20;       <div class="tasks-section">

&#x20;           <h3>📋 Suas Tarefas</h3>

&#x20;           <?php if (count($tarefas) > 0): ?>

&#x20;               <?php foreach ($tarefas as $tarefa): ?>

&#x20;                   <div class="task-item">

&#x20;                       <span class="task-status <?php echo $tarefa\['concluida'] ? 'done' : 'pending'; ?>"></span>

&#x20;                       <span class="task-text"><?php echo htmlspecialchars($tarefa\['descricao']); ?></span>

&#x20;                       <span class="task-date"><?php echo date('d/m/Y', strtotime($tarefa\['data\_limite'])); ?></span>

&#x20;                   </div>

&#x20;               <?php endforeach; ?>

&#x20;           <?php else: ?>

&#x20;               <p style="color: #888; padding: 20px 0;">Nenhuma tarefa cadastrada.</p>

&#x20;           <?php endif; ?>

&#x20;       </div>

&#x20;   </div>



&#x20;   <script src="../assets/js/dashboard.js"></script>

</body>

</html>



**CSS BASE - STYLE.CSS**

/\* assets/css/style.css \*/

\* {

&#x20;   margin: 0;

&#x20;   padding: 0;

&#x20;   box-sizing: border-box;

&#x20;   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}



/\* ===== LOGIN ===== \*/

.login-page {

&#x20;   background: linear-gradient(135deg, #1a472a, #2d6a3f);

&#x20;   min-height: 100vh;

&#x20;   display: flex;

&#x20;   justify-content: center;

&#x20;   align-items: center;

}



.login-container {

&#x20;   width: 100%;

&#x20;   max-width: 420px;

&#x20;   padding: 20px;

}



.login-box {

&#x20;   background: white;

&#x20;   padding: 40px;

&#x20;   border-radius: 16px;

&#x20;   box-shadow: 0 10px 30px rgba(0,0,0,0.3);

}



.login-box .logo {

&#x20;   text-align: center;

&#x20;   margin-bottom: 30px;

}



.login-box .logo h1 {

&#x20;   color: #1a472a;

&#x20;   font-size: 28px;

}



.login-box .logo h1 span {

&#x20;   color: #8bc34a;

}



.login-box .logo p {

&#x20;   color: #666;

&#x20;   font-size: 14px;

}



/\* ===== FORMULÁRIOS ===== \*/

.form-group {

&#x20;   margin-bottom: 18px;

}



.form-group label {

&#x20;   display: block;

&#x20;   font-weight: 600;

&#x20;   color: #333;

&#x20;   margin-bottom: 5px;

&#x20;   font-size: 14px;

}



.form-group input,

.form-group select {

&#x20;   width: 100%;

&#x20;   padding: 12px 14px;

&#x20;   border: 2px solid #e0e0e0;

&#x20;   border-radius: 8px;

&#x20;   font-size: 15px;

&#x20;   transition: 0.3s;

}



.form-group input:focus,

.form-group select:focus {

&#x20;   border-color: #2d6a3f;

&#x20;   outline: none;

&#x20;   box-shadow: 0 0 0 3px rgba(45, 106, 63, 0.15);

}



.btn-primary {

&#x20;   width: 100%;

&#x20;   padding: 14px;

&#x20;   background: #1a472a;

&#x20;   color: white;

&#x20;   border: none;

&#x20;   border-radius: 8px;

&#x20;   font-size: 16px;

&#x20;   font-weight: 600;

&#x20;   cursor: pointer;

&#x20;   transition: 0.3s;

}



.btn-primary:hover {

&#x20;   background: #2d6a3f;

&#x20;   transform: scale(1.02);

}



.btn-secondary {

&#x20;   padding: 10px 20px;

&#x20;   background: #e0e0e0;

&#x20;   color: #333;

&#x20;   border: none;

&#x20;   border-radius: 8px;

&#x20;   cursor: pointer;

&#x20;   transition: 0.3s;

}



.btn-secondary:hover {

&#x20;   background: #ccc;

}



.btn-danger {

&#x20;   padding: 10px 20px;

&#x20;   background: #e74c3c;

&#x20;   color: white;

&#x20;   border: none;

&#x20;   border-radius: 8px;

&#x20;   cursor: pointer;

}



.btn-danger:hover {

&#x20;   background: #c0392b;

}



/\* ===== ALERTAS ===== \*/

.alert {

&#x20;   padding: 12px 16px;

&#x20;   border-radius: 8px;

&#x20;   margin-bottom: 20px;

&#x20;   font-size: 14px;

}



.alert-danger {

&#x20;   background: #fde8e8;

&#x20;   color: #c0392b;

&#x20;   border: 1px solid #f5c6cb;

}



.alert-success {

&#x20;   background: #d4edda;

&#x20;   color: #155724;

&#x20;   border: 1px solid #c3e6cb;

}



/\* ===== LINKS ===== \*/

.login-links {

&#x20;   text-align: center;

&#x20;   margin-top: 20px;

&#x20;   font-size: 14px;

}



.login-links a {

&#x20;   color: #1a472a;

&#x20;   text-decoration: none;

&#x20;   font-weight: 500;

}



.login-links a:hover {

&#x20;   text-decoration: underline;

}



.login-links span {

&#x20;   color: #ccc;

&#x20;   margin: 0 10px;

}



**CSS DO BASHBOARD - DASHBOARD.CSS**

/\* assets/css/dashboard.css \*/



/\* ===== SIDEBAR ===== \*/

.sidebar {

&#x20;   position: fixed;

&#x20;   top: 0;

&#x20;   left: 0;

&#x20;   width: 240px;

&#x20;   height: 100vh;

&#x20;   background: #1a472a;

&#x20;   padding: 20px 0;

&#x20;   color: white;

&#x20;   overflow-y: auto;

&#x20;   z-index: 1000;

}



.sidebar .logo {

&#x20;   text-align: center;

&#x20;   font-size: 22px;

&#x20;   font-weight: bold;

&#x20;   padding: 20px 0 25px;

&#x20;   border-bottom: 1px solid #2d6a3f;

&#x20;   margin-bottom: 10px;

}



.sidebar .logo span {

&#x20;   color: #8bc34a;

}



.sidebar ul {

&#x20;   list-style: none;

&#x20;   padding: 0 12px;

}



.sidebar ul li {

&#x20;   padding: 12px 16px;

&#x20;   margin: 3px 0;

&#x20;   border-radius: 10px;

&#x20;   cursor: pointer;

&#x20;   transition: 0.3s;

&#x20;   font-size: 15px;

&#x20;   display: flex;

&#x20;   align-items: center;

&#x20;   gap: 12px;

}



.sidebar ul li:hover {

&#x20;   background: #2d6a3f;

}



.sidebar ul li.active {

&#x20;   background: #2d6a3f;

&#x20;   border-left: 4px solid #8bc34a;

}



.sidebar ul li .badge {

&#x20;   background: #ff6b6b;

&#x20;   color: white;

&#x20;   border-radius: 50%;

&#x20;   padding: 1px 8px;

&#x20;   font-size: 11px;

&#x20;   margin-left: auto;

}



/\* ===== MAIN CONTENT ===== \*/

.main-content {

&#x20;   margin-left: 240px;

&#x20;   padding: 25px 30px;

&#x20;   min-height: 100vh;

&#x20;   background: #f0f4f0;

}



/\* ===== HEADER ===== \*/

.top-header {

&#x20;   display: flex;

&#x20;   justify-content: space-between;

&#x20;   align-items: center;

&#x20;   background: white;

&#x20;   padding: 15px 25px;

&#x20;   border-radius: 12px;

&#x20;   margin-bottom: 25px;

&#x20;   box-shadow: 0 2px 8px rgba(0,0,0,0.06);

}



.top-header h2 {

&#x20;   color: #1a472a;

&#x20;   font-size: 22px;

}



.top-header .user-area {

&#x20;   display: flex;

&#x20;   align-items: center;

&#x20;   gap: 18px;

}



.top-header .user-area .notif-icon {

&#x20;   position: relative;

&#x20;   font-size: 22px;

&#x20;   cursor: pointer;

}



.top-header .user-area .notif-icon .badge-count {

&#x20;   position: absolute;

&#x20;   top: -8px;

&#x20;   right: -8px;

&#x20;   background: #e74c3c;

&#x20;   color: white;

&#x20;   border-radius: 50%;

&#x20;   padding: 1px 7px;

&#x20;   font-size: 11px;

&#x20;   font-weight: bold;

}



.top-header .user-area .avatar {

&#x20;   width: 40px;

&#x20;   height: 40px;

&#x20;   background: #1a472a;

&#x20;   border-radius: 50%;

&#x20;   display: flex;

&#x20;   align-items: center;

&#x20;   justify-content: center;

&#x20;   color: white;

&#x20;   font-weight: bold;

&#x20;   font-size: 18px;

}



/\* ===== CARDS ===== \*/

.cards-grid {

&#x20;   display: grid;

&#x20;   grid-template-columns: repeat(4, 1fr);

&#x20;   gap: 20px;

&#x20;   margin-bottom: 30px;

}



.card {

&#x20;   background: white;

&#x20;   padding: 20px 25px;

&#x20;   border-radius: 12px;

&#x20;   box-shadow: 0 2px 8px rgba(0,0,0,0.06);

&#x20;   display: flex;

&#x20;   align-items: center;

&#x20;   gap: 15px;

&#x20;   transition: 0.3s;

}



.card:hover {

&#x20;   transform: translateY(-3px);

&#x20;   box-shadow: 0 4px 15px rgba(0,0,0,0.1);

}



.card .card-icon {

&#x20;   font-size: 32px;

&#x20;   opacity: 0.7;

}



.card .card-info h4 {

&#x20;   color: #888;

&#x20;   font-size: 13px;

&#x20;   font-weight: 500;

}



.card .card-info .card-value {

&#x20;   font-size: 28px;

&#x20;   font-weight: bold;

&#x20;   color: #1a472a;

}



.card .card-info small {

&#x20;   color: #999;

&#x20;   font-size: 12px;

}



/\* ===== TAREFAS ===== \*/

.tasks-section {

&#x20;   background: white;

&#x20;   border-radius: 12px;

&#x20;   padding: 25px;

&#x20;   box-shadow: 0 2px 8px rgba(0,0,0,0.06);

}



.tasks-section h3 {

&#x20;   color: #1a472a;

&#x20;   margin-bottom: 18px;

&#x20;   font-size: 18px;

}



.task-item {

&#x20;   display: flex;

&#x20;   align-items: center;

&#x20;   padding: 12px 0;

&#x20;   border-bottom: 1px solid #f0f0f0;

}



.task-item:last-child {

&#x20;   border-bottom: none;

}



.task-item .task-status {

&#x20;   width: 12px;

&#x20;   height: 12px;

&#x20;   border-radius: 50%;

&#x20;   margin-right: 15px;

&#x20;   flex-shrink: 0;

}



.task-status.pending {

&#x20;   background: #ffa726;

}



.task-status.done {

&#x20;   background: #66bb6a;

}



.task-item .task-text {

&#x20;   flex: 1;

&#x20;   font-size: 15px;

&#x20;   color: #333;

}



.task-item .task-date {

&#x20;   color: #999;

&#x20;   font-size: 13px;

}



/\* ===== RESPONSIVO ===== \*/

@media (max-width: 992px) {

&#x20;   .cards-grid {

&#x20;       grid-template-columns: repeat(2, 1fr);

&#x20;   }

}



@media (max-width: 768px) {

&#x20;   .sidebar {

&#x20;       width: 70px;

&#x20;   }

&#x20;   .sidebar .logo,

&#x20;   .sidebar ul li span {

&#x20;       display: none;

&#x20;   }

&#x20;   .sidebar ul li {

&#x20;       justify-content: center;

&#x20;       padding: 15px;

&#x20;       font-size: 22px;

&#x20;   }

&#x20;   .main-content {

&#x20;       margin-left: 70px;

&#x20;       padding: 15px;

&#x20;   }

&#x20;   .cards-grid {

&#x20;       grid-template-columns: 1fr;

&#x20;   }

}

