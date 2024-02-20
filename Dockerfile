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

COPY --from=build /app/gsap-bonus.tgz .
COPY --from=build /app/package.json .
COPY --from=build /app/build-node ./build-node
COPY --from=build /app/uploads ./uploads
COPY --from=build /app/prisma .
COPY --from=build /app/.env .
COPY --from=build /app/server.js .


#RUN npm add prisma --save-dev
#RUN npx prisma generate
#RUN npx prisma migrate deploy
#RUN node ./post-deploy.js
CMD ["node", "server.js"]
#ENTRYPOINT tail -f /dev/null #If debug
#docker exec -it website-sogocom-1 bash #If debug