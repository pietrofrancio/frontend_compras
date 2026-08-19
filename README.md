# 🛒 Sistema de Compras Interno

> **Protótipo piloto de um sistema de backoffice para gerenciamento de usuários, produtos, compras e análises de estoque.**

Projeto desenvolvido para a **avaliação prática da Unidade Curricular de Programação de Aplicativos**, do **Curso Técnico em Desenvolvimento de Sistemas — SENAI SC**.

A aplicação foi construída utilizando uma arquitetura **full-stack**, com uma API REST no back-end e uma interface web no front-end.

---

## ⚙️ Tecnologias utilizadas

### Back-end

* **Node.js** — ambiente de execução
* **Express** — criação da API REST
* **Sequelize** — ORM para comunicação com o banco
* **MySQL** — banco de dados relacional

### Front-end

* **HTML5**
* **CSS3**
* **JavaScript**
* **Chart.js** — geração dos gráficos analíticos

### Ferramentas

* **VS Code**
* **REST Client** — testes da API
* **Git / GitHub**

---

## 🧩 Arquitetura

O projeto utiliza uma separação entre **front-end, back-end e banco de dados**, permitindo que a interface consuma os recursos disponibilizados pela API REST.

```text
┌──────────────────────┐
│      FRONT-END       │
│   HTML + CSS + JS    │
└──────────┬───────────┘
           │ HTTP / REST
           ▼
┌──────────────────────┐
│       BACK-END       │
│ Node.js + Express    │
│ Controllers + Routes │
│      Sequelize       │
└──────────┬───────────┘
           │ SQL
           ▼
┌──────────────────────┐
│        MySQL         │
│     db_compras       │
└──────────────────────┘
```

---

## 📁 Estrutura do projeto

```text
sistema_compras/
│
├── backend/
│   ├── controllers/          # Regras de negócio das entidades
│   ├── db/                   # Configuração da conexão com o MySQL
│   ├── models/               # Models Sequelize
│   ├── routes/               # Rotas da API REST
│   ├── scripts/              # Scripts de criação de tabelas e views
│   ├── index.js              # Inicialização do servidor
│   └── teste.http            # Testes da API via REST Client
│
├── frontend/
│   ├── css/
│   │   └── style.css         # Estilos da aplicação
│   ├── js/                   # JavaScript específico de cada tela
│   └── *.html                # Interfaces do sistema
│
├── banco/
│   └── db_compras_backup.sql # Backup da estrutura e dos dados
│
├── diagramas/
│   ├── *.png                 # Diagramas UML
│   ├── *.dot                 # Arquivos-fonte
│   └── *.svg                 # Diagramas vetoriais
│
├── documentos/
│   └── *.pdf                 # Requisitos, regras e infraestrutura
│
└── README.md
```

---

## 🚀 Como executar

### 1. Pré-requisitos

Antes de iniciar, certifique-se de possuir instalado:

* [Node.js](https://nodejs.org/)
* MySQL
* Visual Studio Code
* Extensão **Live Server** *(opcional)*
* Extensão **REST Client** para o VS Code *(opcional, para executar os testes)*

---

### 2. Configurar o banco de dados

Certifique-se de que o **MySQL esteja em execução**.

Caso necessário, altere as credenciais do banco no arquivo:

```text
backend/db/conexao.js
```

O banco utilizado pelo projeto é:

```text
db_compras
```

---

### 3. Instalar as dependências

Entre na pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

### 4. Criar as tabelas

Execute:

```bash
npm run db:sync
```

Esse comando sincroniza os Models do Sequelize e cria as tabelas necessárias no banco.

---

### 5. Criar as Views

Execute:

```bash
npm run db:views
```

As views são utilizadas principalmente para alimentar os recursos de **relatórios e análises** do sistema.

---

### 6. Iniciar a API

```bash
npm start
```

Com o servidor iniciado, a API estará disponível em:

```text
http://localhost:3000
```

---

### 7. Abrir o Front-end

Abra:

```text
frontend/index.html
```

diretamente no navegador ou utilize o **Live Server** do VS Code.

> 💡 **Recomendação:** utilizar o Live Server para uma experiência mais próxima de um ambiente real de desenvolvimento.

---

## 📦 Carga inicial de dados

O sistema possui integração com a API pública **DummyJSON** para facilitar a inserção de dados iniciais.

Nas telas de **Usuários** e **Produtos**, utilize o botão:

> **Importar da API (DummyJSON)**

A funcionalidade realiza a importação dos dados em lote e os persiste no banco de dados local.

---

## 🖥️ Telas do sistema

| Tela                   | Arquivo                             | Função                             |
| ---------------------- | ----------------------------------- | ---------------------------------- |
| 🏠 Início              | `frontend/index.html`               | Página principal                   |
| 👤 Usuários            | `frontend/usuarios.html`            | CRUD de usuários                   |
| 📦 Produtos            | `frontend/produtos.html`            | CRUD de produtos                   |
| 🔄 Compras             | `frontend/compras.html`             | Movimentação de estoque            |
| 📊 Relatório Analítico | `frontend/relatorio-analitico.html` | Visualização de dados em tabelas   |
| 📈 Relatório Gráfico   | `frontend/relatorio-grafico.html`   | Visualização de dados com gráficos |
| 🗂️ Dashboard          | `frontend/dashboard.html`           | Visão geral dos produtos           |

---

## 🔌 API REST

A aplicação disponibiliza endpoints para gerenciamento das principais entidades do sistema.

Entre as operações implementadas estão:

* Cadastro de usuários
* Consulta de usuários
* Atualização de usuários
* Exclusão de usuários
* Cadastro de produtos
* Consulta de produtos
* Atualização de produtos
* Exclusão de produtos
* Movimentação de estoque
* Validação de estoque disponível
* Relatórios analíticos
* Dados para gráficos
* Importação de dados em lote

---

## 📊 Relatórios e análises

O sistema conta com duas abordagens de visualização:

### Relatório Analítico

Apresenta os dados em **tabelas**, permitindo uma análise mais detalhada das informações armazenadas.

### Relatório Gráfico

Utiliza **Chart.js** para transformar os dados do sistema em representações visuais, facilitando a identificação de padrões e indicadores.

### Dashboard

A tela de dashboard reúne informações relevantes dos produtos em uma visão mais rápida e centralizada.

---

## 🧪 Testes da API

Os testes da aplicação estão concentrados no arquivo:

```text
backend/teste.http
```

Para executá-los, recomenda-se utilizar a extensão **REST Client** do VS Code.

Os testes contemplam:

```text
✓ Saúde do servidor
✓ Importação em lote
✓ CRUD de usuários
✓ CRUD de produtos
✓ Movimentação de estoque com sucesso
✓ Validação de movimentação com estoque insuficiente
✓ Relatórios analíticos
✓ Dados para gráficos
```

---

## 🗄️ Banco de dados

O projeto disponibiliza um backup físico do banco em:

```text
banco/db_compras_backup.sql
```

O arquivo contém a **estrutura e os dados** utilizados pela aplicação, permitindo a recuperação do banco em outro ambiente.

---

## 📐 Documentação

Materiais complementares do projeto estão disponíveis na pasta:

```text
documentos/
```

Incluindo:

* Requisitos do sistema
* Regras de negócio
* Documentação de infraestrutura

Os diagramas UML estão disponíveis em:

```text
diagramas/
```

---

## 🎯 Objetivo do projeto

O projeto tem como objetivo aplicar, em um cenário prático, conceitos de:

* Desenvolvimento de APIs REST
* Arquitetura cliente-servidor
* Programação back-end
* Desenvolvimento front-end
* Modelagem e persistência de dados
* ORM com Sequelize
* Operações CRUD
* Controle de estoque
* Relatórios e análise de dados
* Consumo de APIs externas
* Testes de endpoints

---

## 👨‍💻 Projeto acadêmico

Desenvolvido como parte das atividades do:

**SENAI Santa Catarina**
**Curso Técnico em Desenvolvimento de Sistemas**

> Projeto desenvolvido para fins acadêmicos e de avaliação prática.
