FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
COPY package*.json ./
RUN npm install
RUN npm i pm2 -g
RUN npm run test
EXPOSE 5000
CMD ["pm2-runtime","process.json"]