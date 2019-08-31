FROM tiangolo/node-frontend:10 as builder

ADD ./src /app/src
COPY package*.json /app/
COPY ./public /app/public
WORKDIR /app

ENV NODE_ENV=staging

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]

# FROM nginx:1.15

# COPY --from=builder /app/build/ /usr/share/nginx/html
# # COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
# # WORKDIR /usr/share/nginx/html/

# EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"];