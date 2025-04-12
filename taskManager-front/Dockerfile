# Etapa 1: Build da aplicação
FROM node:18 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração e dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Compila a aplicação Angular
RUN npm run build --prod

# Etapa 2: Configuração do servidor NGINX
FROM nginx:alpine

# Copia os arquivos compilados para o diretório padrão do NGINX
COPY --from=build /app/dist/taskManager-front /usr/share/nginx/html

# Exponha a porta 80 para o servidor NGINX
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]