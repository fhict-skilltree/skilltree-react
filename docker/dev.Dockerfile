FROM node:20-alpine3.18
RUN npm install -g pnpm@8
USER "node"
RUN mkdir -p /home/node/app
WORKDIR /home/node/app