FROM node:18-slim AS build

WORKDIR /app

COPY .npmrc ./apps/frontend ./

RUN corepack enable

RUN pnpm i

RUN pnpm build

FROM devforth/spa-to-http:latest

COPY --from=build /app/dist .