ARG NODE_VERSION=18
ARG PORT

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]