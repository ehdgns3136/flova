FROM node:9

WORKDIR /web

COPY package.json package.json
COPY internals internals
RUN yarn install
COPY app app
COPY server server
COPY semantic semantic
RUN yarn build:dll
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]