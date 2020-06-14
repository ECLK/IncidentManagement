# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app

# set baseurl to get connected with backend API
# ENV REACT_APP_API_BASE_URL=http://localhost:8000
ENV REACT_APP_API_BASE_URL=https://api.incidents.ecdev.opensource.lk

ENV REACT_APP_RECAPTCHA_SITEKEY=6Lfk68EUAAAAAFjPNNX0Ht6JWG-BnioxuiaTAIvO
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

# host environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
