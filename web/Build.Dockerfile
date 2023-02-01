FROM mhart/alpine-node:16 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html/
