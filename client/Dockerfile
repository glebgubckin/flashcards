FROM node:18-alpine

WORKDIR /app

COPY . /app/

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["yarn", "preview"]