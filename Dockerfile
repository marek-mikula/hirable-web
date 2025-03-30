ARG NODE_VERSION=18
ARG PORT

FROM node:${NODE_VERSION}-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]