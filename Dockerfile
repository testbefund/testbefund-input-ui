FROM nginx:alpine

COPY dist/testbefund-input-ui* /usr/share/nginx/html/
