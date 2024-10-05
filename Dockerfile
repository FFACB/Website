FROM node:20-alpine AS builder

WORKDIR /app
COPY conf ./conf
COPY modules ./modules
COPY prisma ./prisma
COPY src ./src
COPY static ./static
COPY themes ./themes
COPY .env .
COPY gsap-bonus.tgz .
COPY package.json .
COPY postcss.config.cjs .
COPY server.js .
COPY svelte.config.js .
COPY tailwind.config.cjs .
COPY tsconfig.json .
COPY vite.config.ts .
COPY database.sh .

RUN npm install -g pnpm
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN pnpm install
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN pnpm run build
#ENTRYPOINT tail -f /dev/null 
#If debug
# docker exec -it CMS sh #If debug
# RUN pnpm run build


FROM builder AS deployer

ENV BODY_SIZE_LIMIT=Infinity
# RUN chmod -R 777 ./database.sh
# RUN ./database.sh
CMD [ "node", "server.js" ]

ENTRYPOINT chmod -R 777 ./database.sh && ./database.sh
#CMD ["node", "server.js"]
#ENTRYPOINT tail -f /dev/null #If debug
#docker exec -it CMS sh #If debug