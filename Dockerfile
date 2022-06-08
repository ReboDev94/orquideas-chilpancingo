FROM node:16.15.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon


COPY . .

EXPOSE 3000/tcp


CMD [ "npm" ,"run", "dev"]
