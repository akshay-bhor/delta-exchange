FROM node:16.7-alpine

WORKDIR "/client"

COPY ./package.json .

COPY ./package-lock.json .

RUN npm i

RUN chmod -R 777 node_modules/

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]