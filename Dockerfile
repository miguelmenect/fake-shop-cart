# Usa uma imagem base oficial do Node para construir o projeto (ex: Node 20)
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código-fonte e faz o build de produção
COPY . .
RUN npm run build

# --- Estágio 2: Servir o Aplicativo ---

# Usa uma imagem leve para servir o build (menos de 20MB)
FROM nginx:alpine

# Copia os arquivos de build (dist) do primeiro estágio para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# O Nginx já expõe a porta 80 por padrão
EXPOSE 80

# O comando padrão para iniciar o Nginx já é definido na imagem base
CMD ["nginx", "-g", "daemon off;"]