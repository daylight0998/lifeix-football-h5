FROM registry.aliyuncs.com/football/nginx:1.10
COPY ./output /usr/share/nginx/html
#COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/* /etc/nginx/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
