FROM node:16-alpine as base

WORKDIR /home/node/app
COPY package*.json ./
ARG API_PORT
ENV PORT=${API_PORT}
EXPOSE ${API_PORT}

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY ./ ./
CMD ["node", "src/server.ts"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install --legacy-peer-deps
COPY ./ ./