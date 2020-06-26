FROM nginx:alpine
COPY dist/testbefund-input-ui* /usr/share/nginx/html/
# Custom execution script to make the URLs configurable
ADD docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
CMD ["/docker-entrypoint.sh"]
