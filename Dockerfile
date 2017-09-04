FROM ubuntu

MAINTAINER Jesusalexander <brpoper@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update

RUN apt-get install -y \
    git nginx-light

ADD https://api.github.com/repos/HomeSynology/homeSynology/git/refs/heads/rel version.json
RUN git clone -b rel https://github.com/HomeSynology/homeSynology.git /var/www/homeSynology
RUN rm -rf /var/www/html/*
RUN cp -R /var/www/homeSynology/dist/*  /var/www/html

ADD nginx/www.conf /etc/nginx/sites-available/
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/www.conf /etc/nginx/sites-enabled/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

