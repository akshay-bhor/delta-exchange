FROM node:16.7-alpine

WORKDIR "/server"

COPY ./package.json .

COPY ./package-lock.json .

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]