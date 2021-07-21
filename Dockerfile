FROM nginx:stable

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app
COPY docker/* /docker/
COPY dist .

EXPOSE 80
ENTRYPOINT [ \
  "dockerize", \
  "-template", "/docker/nginx.conf.tpl:/etc/nginx/nginx.conf", \
  "-template", "/docker/.htpasswd.tpl:/etc/nginx/.htpasswd", \
  "-template", "config.json.tpl:config.json" \
  ]
CMD [ "nginx", "-g", "daemon off;" ]

