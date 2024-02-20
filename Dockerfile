FROM node:20.11.1-alpine AS build

WORKDIR /app
COPY . .
RUN rm -rf package-lock.json
RUN rm -rf node_modules
#RUN npm install yarn
RUN yarn install
RUN yarn add prisma --save-dev
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN yarn run build

FROM node:20.11.1-alpine AS deploy-node
WORKDIR /app
RUN rm -rf ./*

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/gsap-bonus.tgz .
COPY --from=build /app/package.json .
COPY --from=build /app/conf ./conf
COPY --from=build /app/modules ./modules
COPY --from=build /app/modules ./modules
COPY --from=build /app/uploads ./uploads
COPY --from=build /app/prisma .
COPY --from=build /app/.env .
COPY --from=build /app/server.js .

CMD ["node", "server.js"]
#ENTRYPOINT tail -f /dev/null #If debug
#docker exec -it CMS sh #If debug