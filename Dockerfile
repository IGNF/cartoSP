ARG registry=docker.io
FROM ${registry}/library/node:18-slim as nodebuild

RUN apt-get update
RUN npm install -g npm
RUN npm install -g @angular/cli@17.3.0

RUN mkdir /opt/cartosp && chown -R node:node /opt/cartosp
WORKDIR /opt/cartosp
COPY . .
RUN npm install
RUN ng build
RUN chown -R node /opt/cartosp/dist/cartosp/browser
USER node

FROM ${registry}/nginxinc/nginx-unprivileged:stable

COPY --from=nodebuild /opt/cartosp/dist/cartosp/browser/ /usr/share/nginx/html
COPY --from=nodebuild /opt/cartosp/.docker/nginx.apps.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

USER nginx

CMD ["nginx", "-g", "daemon off;"]