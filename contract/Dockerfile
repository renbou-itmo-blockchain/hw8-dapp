FROM node:18

WORKDIR /usr/src/contract

COPY package*.json ./
RUN npm ci --only=production

COPY . .
ENTRYPOINT [ "npx", "hardhat" ]