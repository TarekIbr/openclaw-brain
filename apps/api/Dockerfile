FROM node:22-alpine

WORKDIR /app

COPY apps/api/package*.json ./
RUN npm install

COPY apps/api/. .

EXPOSE 8080

CMD ["npm", "run", "dev"]
