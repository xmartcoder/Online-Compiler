FROM node:slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y build-essential

RUN npm install

EXPOSE 3000

CMD ["node", "main.js"]
