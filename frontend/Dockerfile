FROM node:16-alpine

RUN apk add python3 make g++ 
RUN npm install -g serve@14.2.0


USER node 
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm i

COPY --chown=node:node . ./
EXPOSE 3000
RUN npm run build
CMD npx serve -s build -l 3000