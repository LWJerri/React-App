FROM node:18-slim AS build

WORKDIR /app

COPY .npmrc ./apps/frontend ./

RUN corepack enable

RUN pnpm i

RUN pnpm build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf