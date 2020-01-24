FROM nginx:1.13.7
COPY wonder_nginx.conf /etc/nginx/conf.d/default.conf
COPY api.flova.kr/api.flova.kr.key /etc/nginx/ssl/api.flova.kr.key
COPY api.flova.kr/api.flova.kr.pem /etc/nginx/ssl/api.flova.kr.pem
COPY static/ /www/static/