# Estágio 1: Build da aplicação
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio 2: Configuração de Produção
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY .env .env

CMD ["node", "dist/main.js"]
