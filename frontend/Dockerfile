FROM node:18-bullseye AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL



EXPOSE 3000


CMD ["npm", "run", "dev:host"]
