# Etapa 1: Build da aplicação
# FROM node:18 AS build

# # Define o diretório de trabalho dentro do container
# WORKDIR /app

# # Copia os arquivos de configuração e dependências
# COPY package*.json ./

# # Instala as dependências
# RUN npm install

# # Copia o restante do código para o container
# COPY . .

# # Compila a aplicação Angular
# RUN npm run build

# # Etapa 2: Configuração do servidor NGINX
# FROM nginx:alpine

# # Copia os arquivos compilados para o diretório padrão do NGINX
# COPY --from=build /app/dist/task-manager-front /usr/share/nginx/html

# # Exponha a porta 80 para o servidor NGINX
# EXPOSE 80

# # Comando para iniciar o NGINX
# CMD ["nginx", "-g", "daemon off;"]

# Etapa 1: Build da aplicação
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Etapa 2: Servindo com NGINX
FROM nginx:alpine

COPY --from=build /app/dist/task-manager-front/browser /usr/share/nginx/html

# Copia um arquivo de configuração do NGINX (opcional, se você tiver)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]