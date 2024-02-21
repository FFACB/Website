FROM node:20.11.1-alpine

WORKDIR /app
COPY . .
RUN rm -rf package-lock.json
RUN rm -rf node_modules

RUN yarn install
RUN yarn add prisma --save-dev
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN yarn run build

ENTRYPOINT node server.js
#CMD ["node", "server.js"]
#ENTRYPOINT tail -f /dev/null #If debug
#docker exec -it CMS sh #If debug
