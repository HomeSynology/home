FROM ubuntu

MAINTAINER Jesusalexander <brpoper@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update

RUN apt-get install -y \
    git nginx-light

RUN git clone -b rel https://github.com/HomeSynology/homeSynology.git /var/www

ADD nginx/www.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/www.conf /etc/nginx/sites-enabled/
EXPOSE 80


