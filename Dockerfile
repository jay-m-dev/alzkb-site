FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy both package.json and package-lock.json
COPY package*.json ./

RUN npm install
RUN npm install pm2 -g
# if building code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5001
CMD ["pm2-runtime", "alzkb.js"]