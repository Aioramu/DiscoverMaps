FROM node:14-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
RUN npm install react-bootstrap bootstrap
COPY . /app
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
