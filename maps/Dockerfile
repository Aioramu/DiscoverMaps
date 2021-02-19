FROM node:14.1-alpine AS builder
WORKDIR /code
COPY package.json package-lock.json ./
RUN npm install
RUN npm i fs
ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
EXPOSE 3000
