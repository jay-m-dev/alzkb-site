FROM nginx:latest
COPY ./alzkb.template /etc/nginx/conf.d/alzkb.template
RUN /bin/bash -c envsubst < /etc/nginx/conf.d/alzkb.template > /etc/nginx/conf.d/default2.config
