# Etapa 1: Construção
FROM node:18-alpine AS builder

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install --silent

# Copiar o restante dos arquivos da aplicação
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar apenas os artefatos necessários da etapa de construção
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalar apenas as dependências de produção
RUN npm install --silent --only=production

# Definir a variável de ambiente para o ambiente de produção
ENV NODE_ENV=production

# Expor a porta que a aplicação vai usar
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["node", "dist/main.js"]
