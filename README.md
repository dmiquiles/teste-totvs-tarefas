# Teste Técnico TOTVS - Gerenciador de Tarefas

Este repositório contém dois projetos: 

1. **Backend**: Um serviço Spring Boot para gerenciar tarefas.
2. **Frontend**: Uma aplicação Angular para interagir com o backend.

Abaixo estão as instruções para rodar ambos os projetos localmente.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Java 21** ou superior
- **Maven** (ou utilize o wrapper `mvnw` incluído no projeto)
- **Node.js** (versão 18 ou superior)
- **Angular CLI** (instalado globalmente via `npm install -g @angular/cli`)
- **PostgreSQL** (para o banco de dados do backend)

---

## Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL chamado `task_db`.
2. Configure as credenciais no arquivo `taskManager/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/task_db
   spring.datasource.username=postgres
   spring.datasource.password=root


## Como Rodar o Backend
Navegue até o diretório do backend:
`cd taskManager`
Compile e rode o projeto usando o Maven Wrapper:
`./mvnw spring-boot:run`
O backend estará disponível em `http://localhost:8080`.

## Como Rodar o Frontend
Navegue até o diretório do frontend:
`cd taskManager-front`
Instale as dependências do projeto:
`npm install`
Inicie o servidor de desenvolvimento:
`npm start`
O frontend estará disponível em `http://localhost:4200`.

## Testando a Integração
Certifique-se de que o backend está rodando em `http://localhost:8080`.
Acesse o frontend em `http://localhost:4200` e interaja com a aplicação.

## Executando Testes
### Backend
Para rodar os testes do backend, use o comando:
`./mvnw test`

### Frontend
Para rodar os testes do frontend, use o comando:
`npm test`

## Documentação da API
O backend utiliza Swagger para documentar a API. Acesse a documentação em:
`http://localhost:8080/swagger-ui/index.html`

## Observações
Certifique-se de que as portas 8080 (backend) e 4200 (frontend) estão livres no seu ambiente.