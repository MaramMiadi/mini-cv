
FROM nginxinc/nginx-unprivileged:alpine

COPY index.html script.js style.css /usr/share/nginx/html/

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

