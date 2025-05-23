# Teste Técnico TOTVS - Gerenciador de Tarefas

Este repositório contém dois projetos: 

1. **Backend**: Um serviço Spring Boot para gerenciar tarefas.
2. **Frontend**: Uma aplicação Angular para interagir com o backend.

---

## Rodando os Projetos via Docker

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Docker** (versão 20.10 ou superior)
- **Docker Compose** (versão 1.29 ou superior)

### Configuração do Banco de Dados

O Docker Compose já cria um container para o banco de dados PostgreSQL com as seguintes configurações:

- **Banco de Dados**: `taskmanager`
- **Usuário**: `postgres`
- **Senha**: `postgres`

Certifique-se de que o arquivo `application.properties` do backend está configurado para usar essas credenciais:

```properties
spring.datasource.url=jdbc:postgresql://db:5432/taskmanager
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### Comandos para Executar os Projetos

1. **Construa e inicie os containers**:
   ```bash
   docker-compose up --build
   ```

2. **Acesse os serviços**:
   - **Backend**: `http://localhost:8080`
   - **Frontend**: `http://localhost:4200`

3. **Parar os containers**:
   ```bash
   docker-compose down
   ```

4. **Rebuild sem cache (opcional)**:
   Caso precise reconstruir os containers ignorando o cache, use:
   ```bash
   docker-compose up --build --no-cache
   ```

---

## Estrutura do Docker Compose

O arquivo `docker-compose.yml` configura os seguintes serviços:

- **db**: Um container PostgreSQL para o banco de dados.
- **backend**: O serviço Spring Boot.
- **frontend**: A aplicação Angular servida pelo NGINX.

---

## Observações

Certifique-se de que as portas 8080 (backend) e 4200 (frontend) estão livres no seu ambiente.