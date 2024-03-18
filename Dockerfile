FROM node:18-alpine

WORKDIR /app

COPY package* .

RUN npm i --silent

COPY . .

EXPOSE 3005

CMD ["npm","run","start"]