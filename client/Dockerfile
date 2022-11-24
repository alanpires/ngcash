FROM node:16-alpine

WORKDIR /srv/app/
COPY package*.json ./
ARG CLIENT_PORT
ENV PORT=${CLIENT_PORT}
EXPOSE ${CLIENT_PORT}
RUN npm install --legacy-peer-deps

COPY ./ ./
RUN chmod 777 /srv/app/node_modules