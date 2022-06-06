FROM node:16

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=development
ENV PORT=5000

# Install app dependencies
# Copy both package.json and package-lock.json
COPY package*.json ./

RUN npm install
RUN npm install pm2 --location=global
# if building code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD ["pm2-runtime", "alzkb.js"]
