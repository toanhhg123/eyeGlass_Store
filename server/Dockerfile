FROM node:16

WORKDIR /app

COPY package.json  ./
COPY . .

CMD [ "ls" ]

RUN npm install

RUN npm run build

EXPOSE 5151
