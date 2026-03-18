FROM node:20-alpine
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para rodar o Vite aceitando conexões externas (importante para Docker)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]