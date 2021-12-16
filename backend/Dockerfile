FROM node:14 as dev
WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
CMD ["yarn", "dev"]