FROM nginx

RUN apt-get update

RUN apt install -y git

RUN apt install -y nodejs

RUN git clone https://github.com/Reb29/CEN-AWS-Service.git

EXPOSE 80 7566

RUN echo pwd

RUN node CEN-AWS-Service/source/server.js