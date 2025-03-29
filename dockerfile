FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
