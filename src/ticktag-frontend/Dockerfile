# Use a imagem base do Node.js
FROM node:17-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Compile o projeto
RUN npm run build

# Use uma imagem leve para servir a aplicação
FROM nginx:alpine

# Copie os arquivos de build para o NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
