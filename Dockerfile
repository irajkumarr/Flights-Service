FROM node:22-slim

# Install OpenSSL required by Prisma
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy prisma schema first and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
