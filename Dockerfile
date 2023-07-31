FROM ubuntu:latest

SHELL ["/bin/bash", "-c"]
ENV PATH $PATH:/usr/local/bin:/bin/node/bin
RUN apt update
RUN apt install git curl -y
RUN git clone https://github.com/nodenv/node-build.git /bin/node-build
WORKDIR /bin/node-build
RUN PREFIX=/usr/local ./install.sh
RUN node-build 18.17.0 /bin/node
RUN mkdir /app
WORKDIR /app
