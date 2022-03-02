FROM "node"

WORKDIR /card-game

COPY package.json .

COPY . .

CMD ["npm","start"]