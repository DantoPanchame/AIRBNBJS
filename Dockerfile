FROM node:20-bullseye

# Install Oracle Instant Client basiclite
RUN apt-get update && apt-get install -y libaio1 curl unzip && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /opt/oracle && cd /opt/oracle \
  && curl -L -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip \
  && unzip instantclient-basiclite.zip \
  && rm instantclient-basiclite.zip
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient
ENV PATH=$PATH:/opt/oracle/instantclient

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
