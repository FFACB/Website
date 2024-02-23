FROM node:20-alpine

WORKDIR /app
COPY . .
RUN rm -rf package-lock.json
RUN rm -rf node_modules
RUN rm -rf .npmrc

ENV BODY_SIZE_LIMIT=Infinity

RUN npm install -g pnpm
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN pnpm install
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN pnpm run build

ENTRYPOINT node server.js
#CMD ["node", "server.js"]
#ENTRYPOINT tail -f /dev/null #If debug
#docker exec -it CMS sh #If debug