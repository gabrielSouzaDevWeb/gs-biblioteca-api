FROM node:19

WORKDIR /src

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]