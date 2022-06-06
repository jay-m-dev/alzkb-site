FROM node:16

WORKDIR /usr/src/site

ENV NODE_ENV=development
ENV PORT=5000

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 5000

CMD ["pm2-runtime", "alzkb.js"]
