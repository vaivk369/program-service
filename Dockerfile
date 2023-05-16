FROM node:14.19.0-slim
MAINTAINER "Ekstep" "info@ekstep.in"
USER root
COPY src /opt/program-service/
WORKDIR /opt/program-service/
RUN npm install
CMD ["node", "app.js", "&"]
