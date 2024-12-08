FROM node:20-alpine AS base
WORKDIR /home/app
ENV NODE_ENV prod

ENV PATH="$PATH:/root/.local/bin"

FROM base AS deps
COPY .env.prod .
COPY package.json .
COPY yarn.lock .
RUN yarn --verbose

FROM base AS build
COPY . .
COPY --from=deps /home/app/node_modules ./node_modules
RUN yarn build

FROM base AS release
COPY --from=deps  /home/app/.env.prod .
COPY --from=deps  /home/app/package.json .
COPY --from=deps  /home/app/node_modules ./node_modules/
COPY --from=build /home/app/dist ./dist/
# FIXME: Use nest-cli.json for i18n instead
COPY locales /home/app/locales
RUN mkdir /home/app/logger
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV TZ="Asia/Tehran"
EXPOSE 3003
ENTRYPOINT ["node", "--trace-exit", "--trace-sigint" , "--trace-uncaught", "--trace-warnings" , "dist/main.js"]
