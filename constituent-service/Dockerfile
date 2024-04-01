# Stage 1: Build
FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "start" ]