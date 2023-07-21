FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install -g npm@7.7.6
RUN npm install -g pm2
RUN npm install --legacy-peer-deps

COPY . ./

EXPOSE 8090

ENV PORT=8090
ENV NODE_ENV=production

CMD ["node", "index.js"]
