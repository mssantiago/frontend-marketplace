FROM nginx:1.17.1-alpine
# RUN apt-get install -y nginx-extras
# RUN apk update && apk add nginx-mod-http-headers-more

RUN wget "http://nginx.org/download/nginx-1.17.1.tar.gz" -O nginx.tar.gz && \
    wget "https://github.com/openresty/headers-more-nginx-module/archive/v0.33.tar.gz" -O extra_module.tar.gz

RUN tar -xzvf nginx.tar.gz && \
    tar -xzvf extra_module.tar.gz

RUN apk add --no-cache --virtual .build-deps \
    gcc \
    libc-dev \
    make \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    libxslt-dev \
    gd-dev \
    geoip-dev \
    perl-dev \
    libedit-dev \
    mercurial \
    bash \
    alpine-sdk \
    findutils

WORKDIR /nginx-1.17.1

RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') && \
    sh -c "./configure --with-compat $CONFARGS --add-dynamic-module=/headers-more-nginx-module-0.33/" && make modules

RUN cp /nginx-1.17.1/objs/*_module.so /etc/nginx/modules/

WORKDIR /

COPY /nginx/default.conf /etc/nginx/nginx.conf
COPY /nginx/template.conf /etc/nginx/template.conf
COPY /dist/cng_front /usr/share/nginx/html
CMD envsubst '$NGINXPROXYPASS,$NGINX_SERVERNAME' < /etc/nginx/template.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'

