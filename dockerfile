FROM nginx

RUN mkdir ~/logs

RUN touch ~/logs/logs.txt

RUN apt-get update

RUN apt install -y git

RUN apt install -y npm

RUN npm install nodejs

RUN npm install express

RUN git clone https://github.com/Reb29/CEN-AWS-Service.git

EXPOSE 7566 7566

RUN npm install express

RUN node CEN-AWS-Service/source/server.js