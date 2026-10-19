> **Trabalho de Conclusão de Curso (TCC)** — Técnico em Desenvolvimento de Sistemas — SENAI

Sistema web completo que integra **monitoramento agrícola por Internet das Coisas (IoT)**, um **dashboard de controle inteligente** e uma **central de apoio à regularização documental** para pequenos produtores rurais, com foco no acesso a benefícios governamentais como o **PRONAF**.

---

## 📖 Sobre o Projeto

A agricultura familiar é responsável por cerca de **70% dos alimentos consumidos no Brasil**, segundo o IBGE. Apesar disso, pequenos produtores enfrentam dois grandes obstáculos:

1. **Falta de acesso a tecnologias acessíveis** de monitoramento agrícola;
2. **Dificuldade burocrática** para regularizar documentação e acessar crédito rural.

O **AgroFácil** surge para resolver esses problemas em uma única plataforma, unindo:

| Pilar | Descrição |
|-------|-----------|
| 📡 **IoT no Campo** | Sensores coletam dados de temperatura e umidade do solo em tempo real |
| 📊 **Dashboard Inteligente** | Interface web que transforma dados brutos em insights acionáveis |
| 📄 **Regularização Agrícola** | Guia completo para obtenção de CAF, CAR e acesso ao PRONAF |

---

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança
- [x] Login com sessão PHP
- [x] Cadastro de novos usuários
- [x] Recuperação de senha
- [x] Controle de acesso por usuário

### 📊 Dashboard Principal
- [x] Cards com indicadores em tempo real
- [x] Lista de tarefas pendentes e concluídas
- [x] Contador de notificações não lidas
- [x] Saudação personalizada ao usuário

### 📟 Gestão de Dispositivos IoT
- [x] Cadastro de sensores (temperatura, umidade, pluviômetro, luminosidade)
- [x] Vinculação de sensores a áreas específicas
- [x] Controle de status (ativo, inativo, manutenção)
- [x] Histórico de leituras por dispositivo

### 📍 Gestão de Áreas
- [x] Cadastro de talhões com cultura plantada
- [x] Registro de coordenadas geográficas (latitude/longitude)
- [x] Cálculo de área em hectares

### 🗺️ Mapa Interativo
- [x] Visualização geográfica das áreas cadastradas
- [x] Marcadores com popups informativos
- [x] Zoom e navegação em mapa OpenStreetMap

### 🔔 Sistema de Alertas Automáticos
- [x] Notificação quando umidade do solo < 40%
- [x] Alerta quando temperatura > 33°C
- [x] Marcação de notificações como lidas

### 📄 Central de Documentação Agrícola
- [x] Guia sobre CAF (Cadastro da Agricultura Familiar)
- [x] Orientações sobre CAR (Cadastro Ambiental Rural)
- [x] Informações sobre PRONAF e linhas de crédito

### 🤖 Simulador de Sensores IoT
- [x] Geração automática de leituras realistas
- [x] Integração pronta para receber dados de ESP32/Arduino
- [x] Disparo automático de alertas baseados em regras agronômicas

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **HTML5**
- **CSS3**
- **React**

### Back-end
- **PHP 8.x**
- **PDO**

### Banco de Dados
- **MySQL 8.x**

### IoT (previsto)
- **ESP32 / Arduino**
- **Sensores** - Umidade do solo, temperatura.

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────┐
│   CAMADA DE APRESENTAÇÃO (Front-end)    │
│   HTML + CSS + JavaScript               │
│   Dashboard, Login, Mapa, Documentação  │
└──────────────────┬──────────────────────┘
                   │ HTTP/JSON
                   ▼
┌─────────────────────────────────────────┐
│   CAMADA DE APLICAÇÃO (Back-end)        │
│   PHP + APIs REST                       │
│   Autenticação, CRUDs, Alertas          │
└──────────────────┬──────────────────────┘
                   │ SQL
                   ▼
┌─────────────────────────────────────────┐
│   CAMADA DE DADOS (MySQL)               │
│   usuarios, areas, dispositivos,        │
│   leituras, notificacoes, tarefas       │
└─────────────────────────────────────────┘
                   ▲
                   │ HTTP POST
┌──────────────────┴──────────────────────┐
│   CAMADA IoT                            │
│   Sensores (ESP32/Arduino) ou simulador │
└─────────────────────────────────────────┘
```
