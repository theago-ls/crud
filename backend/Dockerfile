FROM node:14 as dev
WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
CMD npx prisma migrate dev && yarn dev