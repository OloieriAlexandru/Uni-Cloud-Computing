FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT
EXPOSE 3334
ENTRYPOINT [ "node", "app.js" ]
