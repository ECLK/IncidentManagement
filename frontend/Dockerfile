FROM tiangolo/node-frontend:10 as builder

ADD ./src /app/src
COPY package*.json /app/
COPY ./public /app/public
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.15

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/

CMD echo 'window._env_ = {}; window._env_.API_BASE ="'${API_BASE}'"' > env-config.js && nginx -g 'daemon off;'
# CMD ["bash", "-c", "echo 'window._env_.API_BASE = \"$API_BASE\"' > env-config.js && nginx -g 'daemon off;'"]
# CMD echo ${API_BASE}

