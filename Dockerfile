FROM node:20-alpine

RUN apk update && apk upgrade --no-cache && apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --only=production; fi

COPY server.js ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
