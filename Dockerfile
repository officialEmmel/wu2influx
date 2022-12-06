# Dockerfile for wu2influx by @officialEmmel

FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g ts-node

CMD ["ts-node", "main.ts"]