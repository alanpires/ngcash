# node base image
FROM node:16

# configura o diretório da aplicação dentro do container
WORKDIR /srv/app/

# instala dependências
# COPY package*.json ./
COPY --chown=node:node package*.json ./
RUN npm install --legacy-peer-deps

EXPOSE 3000

# adiciona o restante do app
COPY --chown=node:node . ./
RUN chmod 777 /srv/app/node_modules
USER node