FROM node:8.11.1

COPY . /usr/back-eleven
WORKDIR /usr/back-eleven


RUN apt update && \
    apt upgrade -y && \
    apt install git -y && \
    apt install npm -y && \
    npm install


EXPOSE 3300

CMD ["sh", "-c", "npm start"]
